var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
    studentID: String,
    //assignmentID: String definito in automatico da mlab
    assignmentType: String,
    delivery: String,
    date: Date
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
