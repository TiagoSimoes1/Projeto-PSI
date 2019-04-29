var Professor_Exame = require('../models/professor_exame');
var Professor = require('../models/professor');
var Disciplina = require('../models/disciplina');

var arraySort = require('array-sort');

exports.calendar_get = function(req,res){

    Professor_Exame.find({}, function(err, pe) {
        var map = [{nomeP: String},{codD: Number,nomeD: String, data: String, horaIni: String, horaEnd: String}];
        
        var s = {nomeP: String};
        var auxs;
        var ds = [{codD: Number,nomeD: String, dataIni: Date, dataFim: Date}];
        var auxds;
    
        pe.forEach(function(line) {
            auxs = Professor.findById(line.professor);
            s.nomeP = auxs[0].nome;
            
            line.disciplinas.forEach(function(d){
                auxds = Disciplina.findById(d.id);
                if (auxds[0].semestre == req.sem) {
                    
                }
            });
            
           map.push({s,ds});
        });
        
        if (req.sort=='prof') {
            arraySort(map,'nomeP');
            res.send(map); 
        }else{
            arraySort(map,'nomeD');
            res.send(map); 
        }

        res.send(map);  
      });
}