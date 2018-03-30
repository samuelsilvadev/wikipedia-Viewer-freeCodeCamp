(function () {
	'use strict';

	const $ = require('./dom-utils').$;
	const wiki = require('./services/wikipedia');

	const $container = $('.js-container');
	const $jsSearchForm = $('.js-search-form');
	const $jsSearchField = $('.js-search-field');

	$jsSearchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		if ($jsSearchField.value) {
			wiki.searchSomething($jsSearchField.value)
				.then(response => {					
					if (response.data.error) {
						throw new Error(`Network response was not ok: ${response.data.error.info}`);
					}
					console.log(response.data.query);
				});
		}
	});
})();
