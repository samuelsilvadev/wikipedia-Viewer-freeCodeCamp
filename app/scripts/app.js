(function () {
	'use strict';

	const $ = require('./dom-utils').$;
	const $$ = require('./dom-utils').$$;
	const wiki = require('./services/wikipedia');

	const $container = $('.js-container');
	const $containerTitles = $('.js-container-titles');
	const $jsSearchForm = $('.js-search-form');
	const $jsSearchField = $('.js-search-field');
	const $jsContainerResults = $('.js-results-search');
	const $jsIconSearch = $('.js-icon-search');
	const $jsIconRandom = $('.js-icon-random');

	const createHTMLSearchresults = data => {
		if (data && data.search && Array.isArray(data.search)) {
			$container.style.height = '15vh';
			$containerTitles.classList.add('hide');
			$jsContainerResults.innerHTML = '';
			$jsContainerResults.innerHTML = data.search.map(result =>
				`
				<div class="article js-article">
					<header>
						<h4 class="article__title">${result.title}</h4>
					</header>	
					<p class="article__sub-title">${result.snippet}</p>
				</div>
				`
			).join('');
			addEventInArticles();
		}
	};
	const handleSubmitSearchForm = e => {
		e.preventDefault();
		if ($jsSearchField.value) {
			wiki.searchSomething($jsSearchField.value)
				.then(response => {
					if (response.data.error) {
						throw new Error(`Network response was not ok: ${response.data.error.info}`);
					}
					console.log(response.data.query);
					createHTMLSearchresults(response.data.query);
				});
		}
	};
	const handleKeyDownSearchField = e => {
		if (e.target.value.length === 0) {
			$containerTitles.classList.remove('hide');
			$container.style.height = '100vh';
			$jsContainerResults.innerHTML = '';
		}
	};
	const handleClickWikipediaLink = title => {
		const WIKIPEDIA_BASE = 'https://en.wikipedia.org/wiki/'
		window.open(`${WIKIPEDIA_BASE}${title}`, '_blank');
	};
	const addEventInArticles = e => {
		const $articles = $$('.js-article');
		const arrArticles = [...$articles];
		arrArticles.forEach(article =>
			article
				.addEventListener(
					'click',
					handleClickWikipediaLink.bind(null, article.children[0].children[0].innerText)
				)
		);
	};
	const handleClickRandom = e => {
		const WIKIPEDIA_RANDOM = 'https://en.wikipedia.org/wiki/Special:Random'
		window.open(`${WIKIPEDIA_RANDOM}`, '_blank');
	};
	$jsSearchForm.addEventListener('submit', handleSubmitSearchForm);
	$jsSearchField.addEventListener('keyup', handleKeyDownSearchField)
	$jsIconSearch.addEventListener('click', handleSubmitSearchForm);
	$jsIconRandom.addEventListener('click', handleClickRandom);
})();
