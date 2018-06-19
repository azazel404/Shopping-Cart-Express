var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

////---------Register password --------------------------
passport.use('local.signup',new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},(req,email,password,done) => {
    req.checkBody('email','invalid email').notEmpty().isEmail();
    req.checkBody('password','invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
        if(errors){
          var messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });
      return done(null,false,req.flash('error',messages));
  }
  process.nextTick(function(){
    User.findOne({'email': email},(err,user) => {
      if(err){
        return done(err);
      }
      if(user) {
        return done(null,false,{message: 'email already  inuse'});
      }
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save((err,result) => {
        if(err) return done(err);
        return done(null,newUser);
      });
    });
  });
}));

///---------------Login password -------------------------
passport.use('local.signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
},(req,email,password,done) => {
  req.checkBody('email','invalid email').notEmpty().isEmail();
  req.checkBody('password','invalid password').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  }
  user.findOne({'email':email},(err,user) => {
    if(err) {
      return done(err);
    }
    if(!user){
      return done(null,false,{message : "user not found"});
    }
    if(!user.validPassword(password)){
      return done(null,false,{message: "password wrong"});
    }
    return done(null,user);
  });
}));
