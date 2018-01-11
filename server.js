/*
* API-assignment implementation
* Server
* @author Anna Martignano
*/

//Libraries
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlParser = require('url-parser');
var Assignment = require('./assignment');

const app = express();

//connection to nosql db
mongoose.Promise = global.Promise;
var options = {
    useMongoClient: true,
    user: 'user',
    pass: 'pass'
  };
mongoose.connect('mongodb://user:pass@ds247077.mlab.com:47077/assignment_db', options);
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

// code to receive JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port for Heroku
var port = process.env.PORT || 8080;

//instance of the express router
var router = express.Router();

//ROUTING /assignments
router.route('/assignments')
  // this code will be activated if a POST request arrive on
  //  “/api/assignment”

  /**
      POST
  */
  .post(function (req, res) {
    var assignment = new Assignment();
    assignment.studentID = req.body.studentID;
    assignment.assignmentType = req.body.assignmentType;
    assignment.delivery = req.body.delivery;
    var date = new Date(Date.now());
    assignment.date= date.toISOString();

    assignment.save( function(err) {
      if(err) {
        res.send(err);
      }
      res.json(assignment);
    });

  })
  /**
      GET
  */
  .get(function(req, res) {
    Assignment.find(function(err, assignments) {
      if(err){res.send(err);}
      res.json(assignments);
    });
  });

//ROUTING /assignments/assignment
router.route('/assignments/:assignment_id')

  //get assignment with a specific id
  .get(function(req, res) {
    Assignment.findById(req.params.assignment_id, function(err, assignment){
      if (err) {res.send(err);}
      res.json(assignment);
    });
  })

  .put(function(req,res){
    Assignment.findById(req.params.assignment_id, function(err, assignment){
      if(err){res.send(err);}
      assignment.studentID = req.body.studentID;
      assignment.assignmentType = req.body.assignmentType;
      assignment.delivery = req.body.delivery;
      var date = new Date(Date.now());
      assignment.date= date.toISOString();

      assignment.save( function(err) {
        if(err) {
          res.send(err);
        }
        res.json(assignment);
      });
    });
  })


  .delete(function(req,res){
    Assignment.remove({
      _id: req.params.assignment_id
    }, function(err, assignment){
      if(err){res.send(err);}
      res.json({message:'Successfully deleted'});
    });
  });




// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    /*if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }*/
    // make sure we go to the next routes
    next();
});

// register our router on /api
app.use('/api', router);

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});

 //start the server
 app.listen(port, function() {
     console.log("Server running on port: " + port);
 })

 module.exports = app;
