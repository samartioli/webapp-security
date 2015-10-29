var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.render('dom.jade');
});

var server = app.listen(3000, function () {});
