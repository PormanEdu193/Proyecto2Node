// Requerir los módulos necesarios
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requerir las rutas de los diferentes endpoints
var indexRouter = require('./routes/index'); // Ruta para las vistas principales
var bicyclesRouter = require('./routes/bicycles'); // Ruta para las vistas relacionadas con las bicicletas
var bicyclesApiRouter = require('./routes/api/bicyclesApi'); // Ruta para la API de bicicletas

// Crear una instancia de la aplicación Express
var app = express();

// Configurar el motor de vistas y la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configurar los middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar las rutas
app.use('/', indexRouter); // Ruta principal
app.use('/bicycles', bicyclesRouter); // Ruta para las vistas relacionadas con las bicicletas
app.use('/api/bicyclesApi', bicyclesApiRouter); // Ruta para la API de bicicletas

// Manejador para errores 404 (no encontrado)
app.use(function(req, res, next) {
  next(createError(404)); // Crear un error 404 y pasarlo al siguiente middleware
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Establecer variables locales solo si estamos en entorno de desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

// Exportar la aplicación para que pueda ser utilizada en otros archivos
module.exports = app;

// Autor: Andres Felipe Calderon Mancera
