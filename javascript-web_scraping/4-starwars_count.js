#!/usr/bin/node
const request = require('request');

const url = process.argv[2];

request(url, function (error, response, body) {
    if (error) {
	console.error(error);
	return;
    }
    const films = JSON.parse(body).results;
    const count = films.reduce((acc, film) => {
	if (film.characters.includes('https://swapi-api.hbtn.io/api/people/18/')) {
	    return acc + 1;
	}
	return acc;
    }, 0);
    console.log(count);
});
