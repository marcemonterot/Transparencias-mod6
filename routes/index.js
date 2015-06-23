//se debe volver a cargar ota vez en este modulos
var express = require('express');
//generador de ruta
var router = express.Router();

/* GET home page. */
//renderiaza el index.ejs
//le cambia el <%= title %> por 'Express'
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

module.exports = router;
