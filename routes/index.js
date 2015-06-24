//se debe volver a cargar ota vez en este modulos
var express = require('express');
//generador de ruta
var router = express.Router();

//importo el quiz controller en el index que es desde donde se gestionara
var quizController=require('../controllers/quiz_controller.js')

/* GET home page. */
//renderiaza el index.ejs
//le cambia el <%= title %> por 'Quiz'

//toda ruta definida en el routes tiene una accion asociada en algun controlador
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//get para la pregunta, accion asociada del controlador quizController es question
router.get('/quizes/question', quizController.question);

//get para la respuesta
router.get('/quizes/answer', quizController.answer);

module.exports = router;
