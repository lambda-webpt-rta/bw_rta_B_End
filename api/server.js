const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const receiptRouter = express.Router();

const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/receipt', authenticate, receiptRouter);

server.get('/',  (req,res) =>{
    res.send('hello, your server is running')
})


module.exports = server;