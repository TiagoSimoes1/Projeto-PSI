var multer = require("multer");

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '../uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
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
    
    //carregar ficheiro 
    //gerar tudo a partir daqui
    //gurdar na base de dados os models

};