var models=require('../models/models.js');

exports.load=function(req,res,next,CommentId){
  //se cambia para que recupere tambien los comentarios asociados
  //models.Quiz.find(idpregunta).then(function(quiz){
  models.Comment.find(
      {
        where: { id: Number(CommentId)}
      }
  ).then(function(comment){
    if (comment)
    {
      req.comment=comment;
      next();
    }
    else {
      next(new Error('La pregunta '+CommentId+' no existe'));
    }
  }).catch(function(error){next(error)});
}



exports.new=function(req,res){
  //creo un objeto de tipo cooment, tenemos en cuenta que se ha hecho en
  //models.Comment la importacion del objeto quiz
  var comment=models.Comment.build(
    {
      texto:'inserte el comentario',
      QuizId:req.params.idpregunta
    }
  );
  res.render('comments/new',{comment:comment, errors:[]});
}



exports.create=function(req,res){
  //es el metodo para hacer la insercion
  //recupero los parametros del body, recordemos que el name de los campos
  //era quiz[pregunta] y quiz[respuesta]
  //esto es posible si en el urlencoded se quita el extended:false
  var comment=models.Comment.build({
                                    texto:req.body.comment.texto,
                                    QuizId:req.params.idpregunta
                                  });

  //se llama al metodo de insercion de sequelize donde se mapean los campos
  //con las propieades
    comment
    .validate()
    .then(
      function(err){
        if (err) {
          res.render('comments/new', {comment: comment, errors: err.errors});
        } else {
          comment // save: guarda en DB campos texto y quizID de comments
          .save({fields: ["texto","QuizId"]})
          .then( function(){
                  //cuando se acaba redirecciona al listado de preguntas
                  res.redirect('/quizes/'+req.params.idpregunta)})
        }      // res.redirect: Redirección HTTP a lista de preguntas
      }
    ).catch(function(error){next(error)});
}

exports.destroy=function(req,res){
    var quizid = req.comment.QuizId;
    req.comment.destroy().then(function(){
      res.redirect('/quizes/'+quizid);
    }).catch(function(error){next(error)});
}


exports.publish=function(req,res){
    req.comment.publicado=true;
    req.comment // save: guarda en DB campos texto y quizID de comments
    .save({fields: ["publicado"]})
    .then( function(){
            //cuando se acaba redirecciona al listado de preguntas
            res.redirect('/quizes/'+req.params.idpregunta); })
    .catch(function(error){next(error)});
  };
