'use strict';

const axios = require('axios');

const searchSomething = term => {
	const http = axios.create({
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		}
	});
	return http.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${term}&format=json&limit=5&origin=*`);
};

module.exports = {
	searchSomething
}
