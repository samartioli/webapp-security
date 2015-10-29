var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
// My Bank

var mybank = express();
mybank.use(bodyParser.urlencoded({ extended: true }));
mybank.use(cookieParser())

mybank.get('/', function (req, res) {
    res.render('mybank.jade', req.cookies);
});

mybank.post('/', function (req, res) {
    res.cookie('loggedin', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send('logged in');
});

mybank.post('/transfer', csrfProtection, function (req, res) {
    if (req.cookies.loggedin ==1) {
        console.log('### INFO: transfering %j', req.body.amount);
        res.send('Amount Transferred');
    } else {
        res.send('You need to be logged in to transfer money');
    }
});

mybank.get('/transfer', csrfProtection, function (req, res) {
    if (req.cookies.loggedin ==1) {
        res.render('transfer-blocked.jade', { csrfToken: req.csrfToken() });
    } else {
        res.send('You need to be logged in to transfer money');
    }
});

var mybankServer = mybank.listen(3000, function () {});

// Bad Server

var badsite = express();

badsite.get('/', function (req, res) {
    res.render('badsite.jade');
});

var badsiteServer = badsite.listen(3001, function () {});
