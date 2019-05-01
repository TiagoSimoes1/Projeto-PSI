var Professor_Exame = require('../models/professor_exame');
var Professor = require('../models/professor');
var Disciplina = require('../models/disciplina');
var Exame = require('../models/Exame');

var arraySort = require('array-sort');

//UC3
exports.calendar_get = function(req,res){

    Professor_Exame.find({}, function(pe) {
        var map = [{nomeP: String,codD: Number,nomeD: String, data: String, horaIni: String, horaEnd: String}];
        
        
        var ds = {nomeP: String,codD: Number,nomeD: String,data: String, horaIni: String, horaEnd: String};
        
    
        pe.forEach(function(line) {

            Professor.findById(line.professor,function(auxs){
                ds.nomeP = auxs.nome;
            });
            
            line.exames.forEach(function(d){
                
                Exame.findById(d,function(e){

                    Disciplina.findById(d.disciplina,function(auxds){
                    
                        if (auxds.semestre == req.sem && e.anoletivo == req.anoletivo) {
                            ds.codD = auxds.codigo;
                            ds.nomeD = auxds.nome;
                            ds.data = toStringDate(e.data);
                            ds.horaIni = e.hInicio;
                            ds.horaEnd = e.hFim;
        
                            map.push(ds);
                        }
                    });

                });
            });
        });
        
        if (req.sort=='prof') {
            arraySort(map,'nomeP');  
        }else{
            arraySort(map,'nomeD');
        }

        res.send(map);  
      });
};

//UC1
exports.getVigilancia = function(req,res){

    var result = {nomeD: String, data: String, salas: [String], respD: String};

    var id_prof;

    Professor.find({'nome': req.prof},function(p){
        id_prof = p.id;
    });

    Professor_Exame.findOne({'professor': id_prof},function(list){
        list.exames.forEach(function(e){
            Exame.findById(e,function(ex){
                //nome 
                Disciplina.findById(e.disciplina,function(d){
                    result.nomeD = d.nome;
                    //responsavel
                    Professor.findById(d.regente,function(p){
                        result.respD = p.nome;
                    });
                }); 
                //data
                result.data = ex.data;
                //salas
                result.salas = ex.salas;
            });
        });
    });

    res(result);
};
//UC2
exports.getVigilantes = function(req,res){ //preciso de saber o ano letivo,regente
    //saber as disciplinas em que é responsavel
    var result = [{nomeD: String, dataE: String, salas: [String], vigilantes: [String]}];
    var result_aux = {nomeD: String, dataE: String, salas: [String], vigilantes: [String]};
    var nomeDisc = [String];
    var idDisc = [String];
    var cont = 0;
    var exame;

    Disciplina.find({'regente':req.regente},function(r){
        r.forEach(function(line){
            nomeDisc.push(line.nome);
            idDisc.push(line._id);
        });
    });
    
    idDisc.forEach(function(d){
        result_aux.nomeD = nomeDisc[cont];
        cont++;
        Professor_Exame.find({'exames.disciplina': d },function(l){
            l.forEach(function(line){
                exame = line.exames.filter(e => e.disciplina == d && e.anoletivo == req.anoletivo);
                exame.forEach(function(e){
                    
                });
               

            });
            
        });
    });
  
};

//-----PRIVATE METHODS-----//

function toStringDate(date){
    return date.getDay()+"/"+date.getMonth()+1+"/"+date.getYear();
};
