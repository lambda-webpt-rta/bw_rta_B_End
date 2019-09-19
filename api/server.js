const express = require('express');
const server = express();
// const recipeRouter = require('../recipes/recipe-router');
server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello, your server is running');
});

server.use('/recipes', (req, res) => {
  res.send('hello from recipe route');
});

module.exports = server;
