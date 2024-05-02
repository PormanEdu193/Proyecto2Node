// Importar el módulo express
var express = require('express');

// Crear un enrutador utilizando el método Router() de express
var router = express.Router();

// Importar el controlador de bicicletas
var bicyclesController = require('../controllers/bicycleController');

// Definir las rutas y asociarlas a los métodos del controlador correspondientes

// Ruta para obtener la lista de bicicletas
router.get('/', bicyclesController.bicycle_list);

// Ruta para mostrar el formulario de creación de una bicicleta
router.get('/create', bicyclesController.bicycle_create_get);

// Ruta para manejar la creación de una bicicleta (envío del formulario)
router.post('/create', bicyclesController.bicycle_create_post);

// Ruta para manejar la eliminación de una bicicleta
router.post('/:id/delete', bicyclesController.bicycle_delete_post);

// Ruta para mostrar el formulario de actualización de una bicicleta
router.get('/:id/update', bicyclesController.bicycle_update_get);

// Ruta para manejar la actualización de una bicicleta (envío del formulario)
router.post('/:id/update', bicyclesController.bicycle_update_post);

// Exportar el enrutador para que pueda ser utilizado por otros archivos
module.exports = router;

// Autor: Andres Felipe Calderon Mancera
