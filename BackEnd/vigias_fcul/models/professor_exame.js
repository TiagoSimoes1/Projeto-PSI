var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Professor_ExameSchema = new Schema({
    professor: {type: Schema.Types.ObjectId, ref:'Professor', required = true},
    disciplinas: [{type:Schema.Types.ObjectId, ref:'Disciplina'}]
});

module.exports = mongoose.model('Professor_Exame', Professor_ExameSchema);