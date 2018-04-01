(function () {
	'use strict';

	const $ = require('./dom-utils').$;
	const wiki = require('./services/wikipedia');

	const $container = $('.js-container');
	const $containerTitles = $('.js-container-titles');
	const $jsSearchForm = $('.js-search-form');
	const $jsSearchField = $('.js-search-field');
	const $jsContainerResults = $('.js-results-search');
	
	const createHTMLSearchresults = data => {
		if (data && data.search && Array.isArray(data.search)) {
			$container.style.height = '15vh';
			$containerTitles.classList.add('hide');
			$jsContainerResults.innerHTML = '';
			$jsContainerResults.innerHTML = data.search.map(result => 
				`
				<div class="article">
					<header>
						<h4 class="article__title">${result.title}</h4>
					</header>	
					<p class="article__sub-title">${result.snippet}</p>
				</div>
				`
			).join('');
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
	$jsSearchForm.addEventListener('submit', handleSubmitSearchForm);
})();
