const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/signup', function(req, res) {
  res.render('auth/signup.ejs');
});

router.get('/login', function(req, res) {
  res.render('auth/login.ejs');
});

router.post('/signup', function(req, res) {
  // Find or create the user, if the user is found error and redirect, else, create redirect to home
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]) {
    if (created) {
      console.log('User successfully created');
      res.redirect('/');
    } else {
      console.log('Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(err) {
    console.log(err);
    res.redirect('/auth/signup');
  });
});

module.exports = router;
