var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('<p>hello ' + req.query.user + '</p>');
});

var server = app.listen(3000, function () {});
