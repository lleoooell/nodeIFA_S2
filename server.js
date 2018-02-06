// const http = require('http');

// C'est ici que l'on déclare les variables et librairies nécessaires au fontionnement de node
const express = require('express');
var path = require('path');
var data = require("./data/data.json");
var _ = require("lodash");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Eleve = require("./models/eleve.model");


// j'instancie express dans app
var app = express();
// je connecte ma base de données (prérequis)
mongoose.connect('mongodb://localhost:27017/testIFA2');


// app.use === définir les configurations    


// ici je défini mon reprtoire statique dans lequel je vais mettre a dispo du client css et js + lib externes
app.use('/assets', express.static('client/static'));

// prends en charge les requetes du type ("Content-type", "url enconded")

app.use(bodyParser.urlencoded({
    extended: true
}));

// prends en charge les requetes du type ("Content-type", "application/json")
app.use(bodyParser.json());

// le body parser me permts de récuperer directement un body en json sasn avoir a parser a la main chaque objet stringifie qui arrive sur mons serveur


// je sers mes fichiers html de base, mes pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.get('/profil', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/page.html'));
});
app.get('/new', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/new.html'));
});


// je défini les routes de mon application


// cette route sert à renvoyer un user à partir de osn id
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
// cette route liste tous les users de ma page 
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

// cette route cr"ée un tulisateur
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
// je post les infos d'un user dans le body avec en param, l'id a modifier, mon serveur fait le reste
app.post('/liste/:id', function(req, res) {

    // console.log(req.body);
    // var newEleve = new Eleve(req.body);

    Eleve.update({
        _id: req.params.id
    }, req.body, {}, function(err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
        res.json(raw);
    });

});
// cette route sert à faire un delete pout suspprimer mon entée
app.delete('/liste/:id', function(req, res) {
    Eleve.findByIdAndRemove(req.params.id, (err, todo) => {
        var response = {
            message: "User successfully deleted",
            id: todo._id
        };
        res.status(200).send(response);
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