//hardcodeo de dos usuarios
var users={
  admin:{ id:1, username:"admin", password:"1234"},
  pepe:{ id:2, username:"pepe", password:"5678"}
}

exports.autenticar=function(usuario,contraseña,callback){
  if (users[usuario]){
    if (users[usuario].password==contraseña)
    {
      callback(null,users[usuario]);
    }
    else {
      callback(new Error("Contraseña inválida"));
    }
  }
  else {
    callback(new Error("No existe el usuario"));
  }
}
