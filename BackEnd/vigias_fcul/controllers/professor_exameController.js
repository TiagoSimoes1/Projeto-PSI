var Professor_Exame = require('../models/professor_exame');
var Professor = require('../models/professor');
var Disciplina = require('../models/disciplina');

exports.calendar_get = function(req,res){
    Professor_Exame.find([], function(err, pe) {
        var map = [String,[Disciplina]];
        
        var s = String;
        var ds = [Disciplina];
    
        pe.forEach(function(line) {
            s = Professor.findById(line.professor);
            
            line.disciplinas.forEach(function(d){
                ds.push(Disciplina.findById(d.id));
            });
            
           map.push({s,ds});
        });
    
        res.send(map);  
      });
}