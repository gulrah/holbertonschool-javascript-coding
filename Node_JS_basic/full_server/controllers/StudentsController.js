const readDatabase = require('../utils');

class StudentsController {
    static getAllStudents(req, res) {
        readDatabase(req.query.path)
            .then((fields) => {
                res.write('This is the list of our students\n');
                for (const field in fields) {
                    res.write(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`);
                }
                res.end();
            })
            .catch((error) => {
                res.status(500).send('Cannot load the database');
            });
    }

    static getAllStudentsByMajor(req, res) {
        const major = req.params.major;
        if (major !== 'CS' && major !== 'SWE') {
            res.status(500).send('Major parameter must be CS or SWE');
            return;
        }

        readDatabase(req.query.path)
            .then((fields) => {
                const students = fields[major] || [];
                res.send(`List: ${students.join(', ')}`);
            })
            .catch((error) => {
                res.status(500).send('Cannot load the database');
            });
    }
}

module.exports = StudentsController;
