//toda accion de un controlador que responda a un GET tiene una vista asociada
var models=require('../models/models.js');

//lo primero de todo creo la funcion que cargará el objeto (autoload)
//asi se simplificará el codigo y meteremos el tratamiento de errores
//unficado
exports.load=function(req,res,next,idpregunta){
  models.Quiz.find(idpregunta).then(function(quiz){
    if (quiz)
    {
      req.quiz=quiz;
      next();
    }
    else {
      next(new Error('La pregunta '+idpregunta+' no existe'));
    }
  }).catch(function(error){next(error)});
}

//esta funcion era para recuperar una pregunta cuando solo teniamos
//una en base de datos, se dejará de usar
exports.question=function(req,res)
{
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/question',{title:'Pregunta', Titulo:quiz[0].pregunta});
  });
}

//esta funcion me mostrará todas las preguntas de la tabla preguntas base de datos
exports.index=function(req,res)
{
   var objeSearch={};
    if(req.query.search!==undefined){
      var re=new RegExp(' ','g');
      var auxSearch='%'+req.query.search.replace(re,'%')+'%';
      console.log(auxSearch);
      objeSearch={where: ["pregunta COLLATE UTF8_GENERAL_CI LIKE ?", auxSearch]};
    }
    models.Quiz.findAll(objeSearch).then(function(quizes){
      var visib='inline';
      if (models.Quiz.count===quizes.length) {
        visib='none';
      };
      res.render('quizes/index',{quizes:quizes, visibilidad:visib});
    });


}

//esta funcion me mostrar la pregunta recuperada que se le pasa en la ur
//de la API REST
exports.show=function(req,res)
{
  //el find me devuelve el objeto de base de datos
  //ya no hace falta por que hemos metido el autoload
  //models.Quiz.find(req.params.idpregunta).then(function(quiz){
    res.render('quizes/show',{quiz:req.quiz})
  //});
}

exports.answer=function(req,res)
{
  //se cambia para que coja la pregunta que se le pasa por parametro
  //models.Quiz.findAll().success(function(quiz){
    //ya no hace falta por que hemos metido el autoload
  //models.Quiz.find(req.params.idpregunta).then(function(quiz){
    //meto la expresion regular el case insensitive
    //var re = new RegExp(quiz[0].respuesta,"i");
    //aux=req.query.respuesta.toLowerCase();
    if (req.query.respuesta.toLowerCase()!=req.quiz.respuesta.toLowerCase())
    {
      res.render('quizes/answer',{
                              Resultado:'Incorrecta',
                              title:'Respuesta',
                              respuestaUsu:req.query.respuesta,
                              quiz:req.quiz});
    }
    else {
      res.render('quizes/answer',{
                              Resultado:'Correcta',
                              title:'Respuesta',
                              respuestaUsu:req.query.respuesta,
                              quiz:req.quiz});
    };
//  });
}
