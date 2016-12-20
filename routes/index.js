const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

const Account = require('../models/account');
const Product = require('../models/product');


// Route Default
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

// Route Register
router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username, email : req.body.email }), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

// Route Read All Users
router.get('/user-all', (req, res) => {
    Account.find((err, user) => {
        if (err) {
            throw err;
        }
        // res.render('index', {users: user});
        res.json(user);
    })
});

// Route Login
router.get('/login', function(req, res) {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Route Create Products
router.get('/product', function(req, res) {
    res.render('products', { });
});

// Route Read All Products
router.get('/product-all', (req, res) => {
    Product.find((err, product) => {
        if (err) {
            throw err;
        }
        res.json(product || {});
    })
});


router.post('/product', function(req, res, next) {
    Product(new Product({
        model : req.body.model,
        os : req.body.os,
        storage : req.body.storage,
        camera : req.body.camera
    }).save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/product');
    }))
});

module.exports = router;
