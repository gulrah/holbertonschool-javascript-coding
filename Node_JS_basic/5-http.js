const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n');
        const students = lines.slice(1).map(line => line.split(','));
        const result = {};

        result.total = students.length;
        result.fields = {};
        students.forEach((student) => {
          if (!result.fields[student[3]]) {
            result.fields[student[3]] = [];
          }
          result.fields[student[3]].push(student[0]);
        });

        resolve(result);
      }
    });
  });
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    countStudents(process.argv[2]).then((data) => {
      let response = `This is the list of our students\nNumber of students: ${data.total}\n`;
      for (const [field, names] of Object.entries(data.fields)) {
        response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }
      res.end(response.trim());
    }).catch((error) => {
      res.statusCode = 500;
      res.end(error.message);
    });
  }
});

app.listen(1245);

module.exports = app;
