const express = require('express')
const Route = express.Router()
const cors = require('cors');

const { authentication, authorization } = require('../helpers/auth');
const { insertData, getAll, getDetail, updateData, deleteData } = require('../controllers/book');

Route
    .post('/', insertData)
    .get('/', getAll)
    .get('/:bookId', getDetail)
    .put('/:bookId', updateData)
    .delete('/:bookId', deleteData)


module.exports = Route;