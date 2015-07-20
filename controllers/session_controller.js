//con esta funcion o middleware se controlara que el usuario esta autenticado
exports.loginRequired=function(req,res,next){
  if ((req.session.user) && (!req.session.autologout)) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

exports.new=function(req,res){
  //con esto se comprueba se ha habido algun error de autenticacion y se
  //mete en session para pintarlo en el formulario de logina
  var errors=req.session.errors || {};
  req.session.errors=errors;
  res.render('sessions/new',{errors:errors});
}



exports.create=function(req,res){
  //en este metodo se comprueba si existe el usuario y si es asi se crea
  //la cookie de session, sino se rellena la variable de errores y se mantiene
  //en el login al usuario
  var login=req.body.login;
  var password=req.body.password;

  var userControler=require('./user_controller');
  userControler.autenticar(login,password,function(err,user){
    if (err)
    {
      //inicializamos los errores
      req.session.errors=[{message:err.message}];
      res.redirect('/login');
      return;
    }
    else {
        //creo el objeto de session con el usuario y password que ha accedido
        //si no existierá session.user no habría autenticacion
        req.session.user = {id:user.id,username:user.username};
        delete req.session.errors;
        req.session.autologout=false;
        res.redirect(req.session.redir.toString());
    }
  });

}

exports.destroy=function(req,res){
    //me pulo el objeto user
    delete  req.session.user;
    delete req.session.errors;
    //redirijo a la pagina de donde había venido
    res.redirect(req.session.redir.toString());
}
