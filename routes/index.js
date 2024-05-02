// Importar el módulo express
var express = require('express');

// Crear un enrutador utilizando el método Router() de express
var router = express.Router();

/* GET home page. */
// Definir el manejador para la solicitud GET en la ruta raíz ('/')
router.get('/', function(req, res, next) {
  // Renderizar la vista 'index' y pasarle un objeto con el título 'Express'
  res.render('index', { title: 'Express' });
});

// Exportar el enrutador para que pueda ser utilizado por otros archivos
module.exports = router;

// Autor: Andres Felipe Calderon Mancera