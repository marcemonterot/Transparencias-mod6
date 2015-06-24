//toda accion de un controlador que responda a un GET tiene una vista asociada

exports.question=function(req,res)
{
  res.render('quizes/question',{Titulo:'Capital de Italia', title:'Pregunta'});
}


exports.answer=function(req,res)
{
  aux=req.query.respuesta.match(/roma/i);
  if (aux==null)
  {
    res.render('quizes/answer',{Resultado:'Incorrecta', title:'Respuesta', respuestaUsu:req.query.respuesta});
  }
  else {
    res.render('quizes/answer',{Resultado:'Correcta', title:'Respuesta', respuestaUsu:req.query.respuesta});
  }

}
