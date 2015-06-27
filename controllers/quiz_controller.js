//toda accion de un controlador que responda a un GET tiene una vista asociada
var models=require('../models/models.js');

exports.question=function(req,res)
{
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/question',{title:'Pregunta', Titulo:quiz[0].pregunta});
  });

}


exports.answer=function(req,res)
{
  models.Quiz.findAll().success(function(quiz){
    //meto la expresion regular el case insensitive
    //var re = new RegExp(quiz[0].respuesta,"i");
    //aux=req.query.respuesta.toLowerCase();
    if (req.query.respuesta.toLowerCase()!=quiz[0].respuesta.toLowerCase())
    {
      res.render('quizes/answer',{Resultado:'Incorrecta', title:'Respuesta', respuestaUsu:req.query.respuesta});
    }
    else {
      res.render('quizes/answer',{Resultado:'Correcta', title:'Respuesta', respuestaUsu:req.query.respuesta});
    }
  });
}
