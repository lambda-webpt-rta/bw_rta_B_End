const express = require('express');
const server = express();

// server.use(helmet());
server.use(express.json());

// server.use('/api/Recipe', recipeRouter);

module.exports = server;