'use strict';

var express = require('express');
var session = require('express-session');
var lusca = require('lusca');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'abc',
    resave: true,
    saveUninitialized: true
}));

// https://github.com/krakenjs/lusca
app.use(lusca({
    csrf: true,
    csp: {
        policy: {
            'default-src': '\'self\'',
            'script-src': '\'self\' https://ajax.googleapis.com',
            'img-src': '*',
            'child-src': 'https://plusone.google.com https://facebook.com https://platform.twitter.com',
            'style-src': '\'unsafe-inline\''
        }
    },
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: true
}));


// Define Routes

app.get('/', function (req, res) {
    res.render('safe.jade');
});

var server = app.listen(3000, function () {});


