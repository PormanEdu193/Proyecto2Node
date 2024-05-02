// Importar el módulo express
var express = require('express');

// Crear un enrutador utilizando el método Router() de express
var router = express.Router();

// Importar el controlador de la API de bicicletas
var bicyclesApiController = require('../../controllers/api/bicycleApiController');

// Definir las rutas y asociarlas a los métodos del controlador correspondientes

// Ruta para obtener la lista de bicicletas
router.get('/', bicyclesApiController.bicycle_list);

// Ruta para manejar la creación de una bicicleta
router.post('/create', bicyclesApiController.bicycle_create);

// Ruta para manejar la eliminación de una bicicleta
router.delete('/delete', bicyclesApiController.bicycle_delete);

// Ruta para manejar la actualización de una bicicleta
router.put('/update', bicyclesApiController.bicycle_update);

// Exportar el enrutador para que pueda ser utilizado por otros archivos
module.exports = router;

// Autor: Andres Felipe Calderon Mancera
