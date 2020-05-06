const express = require('express');
const Route = express.Router();

const bookRouter = require('./book');
const userRouter = require('./user');
const uploadRoute = require('./upload');

Route
    .use('/book', bookRouter)
    .use('/user', userRouter)
    .use('/uploads', uploadRoute)


module.exports = Route;