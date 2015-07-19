var path=require('path');

//preparo los parametros de conexion de postgres o de sqlite
//DATABASE_URL puede ser lo del .env o la de conf de postgres en heroku
var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6]||null);
var user=(url[2]||null);
var pwd=(url[3]||null);
var protocol=(url[1]||null);
var dialect=(url[1]||null);
var port=(url[5]||null);
var host=(url[4]||null);
var storage=process.env.DATABASE_STORAGE;

//cargo sequelize (el orm: object relational mapping)
var Sequelize=require('sequelize');

//configuracion de Sequelize para usar SQLite
var sequelize = new Sequelize (DB_name,user,pwd,
                              {
                               dialect:protocol,
                               protocol:protocol,
                               port:port,
                               host:host,
                               storage:storage,
                               omitNull: true //solo postgres
                               }
);

//importo la definicion del modelo quiz.js, la tabla QUIZ
var Quiz=sequelize.import(path.join(__dirname,'quiz'));
//importo la definicion del modelo comment.js, la tabla COMMENT
var Comment=sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//sincronizo la definicion del modelo con la base de datos quiz.sqlite
//por si no esta creada la tabla o se ha actualizado
sequelize.sync().then(function(){
    Quiz.count().then(function(count){
      console.log(count);
      Quiz.count=count;
      if (count===0){
        //inserta una nueva fila
        Quiz.create({
                      pregunta:'Capital de Italia',
                      respuesta:'Roma',
                      tema:'geografia'
                    });
        Quiz.create({
                      pregunta:'Capital de Portugal',
                      respuesta:'Lisboa',
                      tema:'geografia'
                    }).then(function(){
                      console.log('tabla creada e inicializada')
                      });
      };
    });
});

//exporto la definicion para que la puedan usar los controladores
//actuar sobre la tabla QUIZ
exports.Quiz=Quiz;
//exporto la definicion para que la puedan usar los controladores
//actuar sobre la tabla COMMENT
exports.Comment=Comment;
