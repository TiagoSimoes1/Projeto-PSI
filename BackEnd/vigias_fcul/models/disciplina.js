var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DisciplinaSchema = new Schema({
    
    codigo: {type:Number, min:0, required = true},
    departamento: {type:String, required = true},
    semestre: {type:Number, enum:[1,2], required = true},
    nome: {type:String,required: true},
    turmas:{type:[String]},
    regente: {type: Schema.Types.ObjectId, ref:'Professor'},
    professores: [{type: Schema.Types.ObjectId, ref:'Professor',required = true}],
    professores_turmas: [{p:{type:Schema.Types.ObjectId, ref:'Professor'},t:[String]}],
    ciclo: {type:Number, enum:[1,2], required = true}

});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);