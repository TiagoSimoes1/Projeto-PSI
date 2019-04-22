var express = require('express');
var router = express.Router();

var disc_controller = require('../controllers/disciplinaController');
var exame_controller = require('../controllers/exameController');
var prof_exame_controller = require('../controllers/professor_exameController');
var prof_controller = require('../controllers/professorController');
var up_controller = require('../controllers/uploadFilesController');

//--UPLOADFILES--//
router.post('/newCalendar', up_controller.new_calendar_post);

router.post('/newDI', up_controller.new_di_post);

