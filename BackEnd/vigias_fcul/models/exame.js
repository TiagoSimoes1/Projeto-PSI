var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ExameSchema = new Schema({

    codigo: {type:Number,min: 0, required = true},
    disciplina: {type: Schema.Types.ObjectId, ref: "Disciplina", required = true},
    semestre: {type:Number, enum:[1,2],required = true},
    epoca: {type: String, enum: ["1","2","Especial"],required = true},
    data: {type:Date,required = true},
    dia: {type:String, enum: ["Seg","Ter","Qua","Qui","Sex","Sab"], required = true},
    hInicio: {type:Date,required = true},
    hFim: {type:Date,required = true},
    salas: {type:[String],required = true},
    anoCurso: {type: Number, enum:[1,2,3]},
    curso: {type:String, enum: ["EI","TI"]}

});

ExameSchema
.virtual('duracao')
.get(function(){
    return Math.abs(this.hFim.getTime() - this.hInicio.getTime());
});

ExameSchema
.virtual('curso')
.get(function(){
    return this.anoCurso + this.curso;
});

module.exports = mongoose.model('Exame', ExameSchema);