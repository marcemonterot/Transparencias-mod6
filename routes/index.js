//se debe volver a cargar ota vez en este modulos
var express = require('express');
//generador de ruta
var router = express.Router();

//importo el quiz controller en el index que es desde donde se gestionara
var quizController=require('../controllers/quiz_controller.js')
var authorsController=require('../controllers/autores_controller.js')

/* GET home page. */
//renderiaza el index.ejs
//le cambia el <%= title %> por 'Quiz'

//si el parametro existe en la ruta ejecuta el controlador
//se debe instalar antes de los middleware que hacen los get
router.param('idpregunta',quizController.load);

//toda ruta definida en el routes tiene una accion asociada en algun controlador
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//get para la pregunta, accion asociada del controlador quizController es question
router.get('/quizes/question', quizController.question);

//usamos este middleware para listar todas las preguntas
router.get('/quizes/', quizController.index);

//usamos este middleware para listar todas las preguntas
router.get('/quizes/:idpregunta(\\d+)', quizController.show);

//get para la respuesta
//router.get('/quizes/answer', quizController.answer);
//modificamos el middleware para que coja la respuesta a la pregunta id
router.get('/quizes/:idpregunta(\\d+)/answer', quizController.answer);

//get para os autores
router.get('/author', authorsController.autores);

module.exports = router;
