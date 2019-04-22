var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfessorSchema = new Schema({
    id: {type:Number, min: 0},
    nome: {type:String, required = true}
});

module.exports = mongoose.model('Professor', ProfessorSchema);