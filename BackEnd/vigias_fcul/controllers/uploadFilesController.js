var multer = require("multer");

const readXlsxFile = require('read-excel-file/node');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '../uploads');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage:store}).single('file');

var Disciplina = require('../models/disciplina');
var Exame = require('../models/exame');
var Professor_Exame = require('../models/professor_exame');
var Professor = require('../models/professor');


exports.new_di_post = function(req,res){

    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
       
        res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
    
    // File path.
    readXlsxFile('/BackEnd/vigias_fcul/uploads/DI-2018_19.xlsx').then((rows) => {

        var disciplina_instance = new Disciplina({});
        var nomeUC = rows[1][3];
        var nomeProf = rows[1][6];
        disciplina_instance.professores.push(nomeProf);

        for (let index = 1; index < rows.length; index++) {
                
            if (nomeUC != rows[index][3]) {
                disciplina_instance.save(function (err) {
                    if (err) return handleError(err); // saved!
                    });
                nomeUC = rows[index][3];
            }
                
            for (let j = 0; j < rows[index].length; j++) {
                const element = rows[index][j];
                if(j == 0){
                    disciplina_instance.departamento = element;
                }else if(j == 1){
                    disciplina_instance.semestre = element;
                }else if(j == 2){
                    disciplina_instance.codigo = element;
                }else if(j == 3){
                    disciplina_instance.nome = element;    
                }else if(j == 4){
                    disciplina_instance.turmas.push(element);    
                }else if(j == 5){
                    if(element != null){
                        disciplina_instance.regente = element;
                    }
                }else if(j == 6){
                    if(element != nomeProf){
                        disciplina_instance.professores.push(element);
                        nomeProf = element;
                    }
                }
                
            } 
            
        }

    })
   
};

exports.new_calendar_post = function(req,res) {
    
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
       
        res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
    
    //carregar ficheiro 
    //gerar tudo a partir daqui
    //gurdar na base de dados os models
}