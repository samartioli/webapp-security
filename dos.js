var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/register', function (req, res) {
    res.render('dos.jade');
});

app.post('/register', function (req, res) {
    res.send(validateEmailFormat(req.body.email));
});

var server = app.listen(3000, function () {});

function validateEmailFormat(string) {

    var toReturn = {
        valid: false,
        seconds: null,
        milliseconds: null
    }
    var hrstart = process.hrtime();

    var emailExpression = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;

    toReturn.valid = emailExpression.test(string);

    var hrend = process.hrtime(hrstart);
    toReturn.seconds = hrend[0];
    toReturn.milliseconds = hrend[1]/1000000;

    return toReturn
}
