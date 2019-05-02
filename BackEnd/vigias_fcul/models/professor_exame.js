var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Professor_ExameSchema = new Schema({
    professor: {type: Schema.Types.ObjectId, ref:'Professor', required : true},
    exames: [{type:Schema.Types.ObjectId, ref:'Exame', required : true}]
});

module.exports = mongoose.model('Professor_Exame', Professor_ExameSchema);