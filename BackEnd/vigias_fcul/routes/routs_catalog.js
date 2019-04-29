var express = require('express');
var router = express.Router();

var disc_controller = require('../controllers/disciplinaController');
var exame_controller = require('../controllers/exameController');
var prof_exame_controller = require('../controllers/professor_exameController');
var prof_controller = require('../controllers/professorController');
var up_controller = require('../controllers/uploadFilesController');

//--UPLOADFILES--//
router.post('/di', up_controller.new_di_post);

router.post('/cal', up_controller.new_calendar_post)

//--PROF_EXAME--//
router.get('/getCal/:ano/:sem/:sort', prof_exame_controller.calendar_get); //ano do tipo "2018/19", sem = "1" ou "2", sort = "disc" ou "prof"
                                                                            

