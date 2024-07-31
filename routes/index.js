var express = require('express');
var router = express.Router();
// var books= require('../resources/books')
var Books = require('../models/book')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const books = await Books.find()
  res.render('index', { title: 'BookApp' ,bookList: books });
});



module.exports = router;
