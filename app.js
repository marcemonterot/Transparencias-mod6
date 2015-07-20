//importamos todos los modulos necesarios
//para la aplicacion MVC
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//para crear master pages
var expressPartials = require('express-partials');
//para encapsular los metodos PUT y DELETE sobre un POST en el action del submit
//var connect=require('connect');
var methodOverride = require('method-override');
//para la gestion de sesiones, ojo que la 1.11.3 no chuta instalamos la 1.0.3
//que es la que aparece en el curso
var session = require('express-session');

//importamos los enrutaores
var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//renderizador de las vistas importante al
//hacer la generacion de la estructura con
//express-generator poner este parametro
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//se descomenta para montar el middleware del favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
//instalar los middlewares predefinidos
//es una factoria que se debe invocar para crear el middleware
app.use(expressPartials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//se quita el extended : false para que se puedan mapear los parametros
//de pregunta y respuesta del quiz en modo post
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//se usa el middleware para los PUT y DELETE en el POST
app.use(methodOverride('_method'));

//uso el middleware de sesiones pongo el ejemplo de la web oficial no el del curso
app.use(session({
  secret: 'Marce Quiz 2015',
  resave: false,
  saveUninitialized: true
}));

//uso esta funcion para guardar la url de redireccion una vez que se haga login
//o logout y para guardar la cookie en el locals y que asi este disponible
//en todas las paginas (vistas)
app.use(function(req, res, next) {
    //si no estamos en las paginas de login o logout guardamos la url
    if (!req.path.match(/\/login|\/logout/)){
      req.session.redir=req.path;
    };
    var aux=new Date().getTime();
    var ant = req.session.miliseconds || aux;
    var diferencia=aux-ant;

    req.session.miliseconds=aux;

    if ((req.session.user) && (diferencia>=(2*60*1000)))
    {
      delete req.session.user;
      req.session.autologout=true;
      //res.redirect('/login');
    }

    //se guarda en el locals que es como una variable estatica disponible
    //en toda la aplicacion
    res.locals.session=req.session;

    next();
});

//instalar los enrutadores a la pagina de
//index y a la de users. tambien se puede instalar con get
app.use('/', routes);
//app.use('/users', users);

//se ejecutara para cualquier ruta que
//no entre por las anteriores de rutas
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
//se instalara este middleware solo en el
//entorno de desarrollo, si no estamos ahi no se instalara
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
//se instalara este middleware para
//el resto de entornos
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});

//exportar para el comando de arranque
module.exports = app;
