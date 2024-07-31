var express = require('express');
var router = express.Router();
var bookList=require('../resources/books');
var books = require('../models/book');

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('addBooks', { title: 'Add Books' });
});

// router.post('/save',function(req ,res,next){
//     bookList.push({...req.body,_id:`00${bookList.length+1}`});
//     res.redirect("/");
// });

router.post('/save',function (req, res ,next){
  var book = new books(req.body);
  book.save();
  res.redirect("/");
});

// router.get('/edit/:_id',function(req,res,next){
//   // console.log(req.params._id);
//   const book = bookList.find((book) => book._id === req.params._id);
//     res.render('editBooks', { title: 'Edit Books', book:book });
// });


// router.post('/saveEdited/:_id',function(req,res,next){
//   const currentIndex= bookList.findIndex((book) => book._id === req.params._id);
//   bookList.splice(currentIndex , 1 ,{...req.body, _id:req.params._id})
//   res.redirect("/");

// });

router.get('/edit/:_id',async function(req,res,next){
  var book = await books.findOne({_id: req.params._id});
  console.log(book);
  res.render('editBooks', { title: 'Edit Book', book:book});
});


router.post('/saveEdited/:_id', async function(req,res,next){
  await books.updateOne({_id: req.params._id},{$set: req.body})
  res.redirect("/");
  });


router.get('/delete/:_id',async function(req, res, next){
  await books.deleteOne({_id:req.params._id});
  res.redirect("/");
})

// router.get('/delete/:_id', function (req, res,next){
//   const currentIndex = bookList.findIndex((book) => book._id === req.params._id);
//   bookList.splice(currentIndex ,1);
//   res.redirect("/");
//   });

 
module.exports = router;

