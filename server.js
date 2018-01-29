// const http = require('http');
const express = require('express');
var path = require('path');
var app = express();

// configure
app.use('/assets', express.static('client/static'));


// respond with "hello world" when a GET request is made to the homepage
app.get('/',check.isAdmin(req), function(req, res) {
      res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/test/:maquery', function(req, res) {
      // res.sendFile(path.join(__dirname + '/client/index.html'));
      console.log(req);
      // res.sendStatus/(200);
      return res.sendStatus(200);
});



app.listen(3001);