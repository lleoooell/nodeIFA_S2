// const http = require('http');
const express = require('express');
var path = require('path');
var app = express();
var data = require("./data/data.json");
var _ = require("lodash");
var bodyParser = require('body-parser')

// configure
app.use('/assets', express.static('client/static'));
app.use(bodyParser.urlencoded({ extended : false }));
// app.use(bodyParser.json());


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.get('/page', function(req, res) {
      res.sendFile(path.join(__dirname + '/client/page.html'));
});

app.get('/liste/:id', function(req, res) {
      // res.sendFile(path.join(__dirname + '/client/index.html'));
      // console.log(req);
      var idToFind = req.params.id;
      console.log(idToFind);
      var index = _.findIndex(data,function(obj) {
      	return obj.ID == idToFind;
      });
      console.log(index);
      if(index >= 0){
      	return res.json(data[index]);
      }
      else{
      	return res.send(200,"object not found");
      }
      // res.sendStatus/(200);
      
});
app.get('/liste/', function(req, res) {
      // res.sendFile(path.join(__dirname + '/client/index.html'));
      console.log(req);

      // res.sendStatus/(200);
      return res.json(data);
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