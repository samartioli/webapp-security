var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var users = ['alice', 'bob'];

app.get('/register', function (req, res) {
    res.render('register.jade');
});

app.post('/register', function (req, res) {

    users.push(req.body.name);
    res.send('added');
});

app.get('/users', function (req, res) {
    res.render('users.jade', { users: users });
});

var server = app.listen(3000, function () {});
