#!/usr/bin/node
const request = require('request');

const url = process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }
  
  const todos = JSON.parse(body);
  const completedTasks = todos.reduce((acc, todo) => {
    if (todo.completed) {
      if (!acc[todo.userId]) {
        acc[todo.userId] = 1;
      } else {
        acc[todo.userId]++;
      }
    }
    return acc;
  }, {});

  console.log(completedTasks);
});
