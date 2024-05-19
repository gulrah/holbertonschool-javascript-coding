#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }

  const films = JSON.parse(body).results;
  const characterId = '18'; // Character ID for "Wedge Antilles"
  let count = 0;

  films.forEach(film => {
    if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
      count++;
    }
  });

  console.log(count);
});
