const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const receiptRouter = express.Router();

const authRouter = require('../auth/auth-router');
const userRouter = require('../users/userRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
// server.use('/api/receipt', authenticate, receiptRouter);

server.get('/',  (req,res) =>{
    res.send('hello, your server is running')
})


module.exports = server;