//se debe volver a cargar ota vez en este modulos
var express = require('express');
//generador de ruta
var router = express.Router();

//importo el quiz controller en el index que es desde donde se gestionara
var quizController=require('../controllers/quiz_controller.js');
var authorsController=require('../controllers/autores_controller.js');
var commentController=require('../controllers/comment_controller.js');
var sessionController=require('../controllers/session_controller.js');

/* GET home page. */
//renderiaza el index.ejs
//le cambia el <%= title %> por 'Quiz'

//si el parametro existe en la ruta ejecuta el controlador
//se debe instalar antes de los middleware que hacen los get
router.param('idpregunta',quizController.load);

router.param('CommentId',commentController.load);


//toda ruta definida en el routes tiene una accion asociada en algun controlador
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

//meto las rutas del control de session
//get para pintar el formulario de ENTRADA DE LOGIN Y PASSWORD
router.get('/login', sessionController.new);

//la primitiva post de REST PARA CREAR LA COOKIE DE SESSION
router.post('/login',sessionController.create);

//usamos este middleware para HACER EL DELETE DE LA COOKIE DE SESSION
router.get('/logout', sessionController.destroy);

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

//get para pintar el formulario de creacion de la pregunta
router.get('/quizes/new', sessionController.loginRequired, quizController.new);

//la primitiva post de REST PARA INSERTAR y para pintar la respuesta
//de la insercion de la pregunta
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

//usamos este middleware para coger la pregunta a editar
router.get('/quizes/:idpregunta(\\d+)/edit', sessionController.loginRequired, quizController.edit);

//usamos este middleware para HACER EL UPDATE EN base de datos
router.put('/quizes/:idpregunta(\\d+)', sessionController.loginRequired, quizController.update);

//usamos este middleware para HACER EL DELETE EN base de datos
router.delete('/quizes/:idpregunta(\\d+)', sessionController.loginRequired, quizController.destroy);

//get para pintar el formulario de creacion del commentario
router.get('/quizes/:idpregunta(\\d+)/comments/new', commentController.new);

//la primitiva post de REST PARA INSERTAR y para pintar la respuesta
//de la insercion del comentario
router.post('/quizes/:idpregunta(\\d+)/comments',commentController.create);

//usamos este middleware para HACER update del campo publicado
router.put('/quizes/:idpregunta(\\d+)/comments/:CommentId(\\d+)/publish',
            sessionController.loginRequired, commentController.publish);

//usamos este middleware para HACER EL DELETE EN base de datos
router.delete('/quizes/comments/:CommentId(\\d+)', sessionController.loginRequired,
commentController.destroy);


//get para los autores
router.get('/author', authorsController.autores);

module.exports = router;
