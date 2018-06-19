var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product = require('../models/product');
var Cart = require('../models/cart');

//jalankan csrf
var csrfProctection = csrf();
router.use(csrfProctection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({},(err,data) => {
    var productChunks = [];
    var chunksize = 3;
    for(var i = 0; i < data.length; i += chunksize){
      productChunks.push(data.slice(i,i + chunksize))
    }
    res.render('shop/index',{title : "shopping cart", products : productChunks})
  })

router.get('/add-to-cart/:id',function(req,res,next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {item : {} });

  Product.findById(productId,function(err,data) {
    if(err){
      return res.redirect('/');
    }
    cart.add(data , data.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});

})

});

module.exports = router;
