//importamos todos los modulos necesarios
//para la aplicacion MVC
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
            error: err
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
        error: {}
    });
});

//exportar para el comando de arranque
module.exports = app;
