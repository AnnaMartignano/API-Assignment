/* Parametri delle API
  - Studente ID "string"
  - Assignment ID "string"
  - Assignment Type "string"
  - Assignment - Content

  Utilizzare
    github
    heroku
    APIARY

  Consegnare
    url di API
    url di Heroku
    url di github (assieme ai casi di test)

    Vogliamo che uno Studente possa modificare e cancellare gli assignment caricati in precedenza
*/

//Libraries
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlParser = require('url-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 80;

app.get('/hello', function(req,res) {
  console.log("HELLO");
  res.send("Hello");
})

//listen in a specific port
app.listen(port, function() {
  console.log('Server running at port ' + port);
})
