// const http = require('http');
const express = require('express');
var path = require('path');
var data = require("./data/data.json");
var _ = require("lodash");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Eleve = require("./models/eleve.model");


var app = express();

mongoose.connect('mongodb://localhost:27017/testIFA2');


// configure
app.use('/assets', express.static('client/static'));


app.use(bodyParser.urlencoded({
    extended: true
}));
// prends en charge les requetes du type ("Content-type", "application/json")
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.get('/profil', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/page.html'));
});
app.get('/new', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/new.html'));
});

app.get('/liste/:id', function(req, res) {
    Eleve.findOne({
        _id: req.params.id
    }, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            // console.log("docs")
            // console.log(docs)
            // alldocs  = docs;
            return res.json(docs);

        }
    });


});
app.get('/liste/', function(req, res) {

    Eleve.find({}, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {

            return res.json(docs);

        }
    });
});

app.post('/liste/', function(req, res) {

    console.log(req.body);
    var newEleve = new Eleve(req.body);

    newEleve.save(function(err, success) {
        if (err) {
            return console.log(err);
        } else {
            console.log(success);
            res.send(success);

        }
    });

});


// app.post('/test/:testparam', function(req, res) {
//       // res.sendFile(path.join(__dirname + '/client/index.html'));
//       console.log(req.params);
//       console.log(req.body);
//       // console.log(req);

//       res.sendStatus(200);
//       // return res.send(data);
// });



app.listen(3001);