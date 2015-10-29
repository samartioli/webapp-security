var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://192.168.99.100/cats');

// Create Schema and Models

var catSchema = mongoose.Schema({
    name: String
});
var Cat = mongoose.model('Cat', catSchema);


// Define Routes

app.get('/create', function (req, res) {
    res.render('cat-create.jade');
});

app.post('/create', function (req, res) {

    var newCat = new Cat({ name: req.body.name });

    newCat.save(function(err, newCat) {
        if (err) return console.error(err);
        res.send('success');
    });

});

app.get('/find', function (req, res) {
    res.render('cat-find.jade');
});

app.post('/find', function (req, res) {

    Cat.find(req.body.query, function(err, foundCat) {
        if (err) return console.error(err);
        res.send(foundCat);
    });

});

app.get('/eval', function (req, res) {
    res.render('cat-eval.jade');
});

app.post('/eval', function (req, res) {

    var catArray = eval(req.body.catArray);

    console.log(catArray);

    res.send(catArray)

});


var server = app.listen(3000, function () {});
