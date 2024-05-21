const express = require('express');
const countStudents = require('./3-read_file_async');
const app = express();
const path = process.argv[2];

app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
    res.write('This is the list of our students\n');
    countStudents(path)
        .then(() => {
            res.end();
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
});

module.exports = app;

app.listen(1245);
