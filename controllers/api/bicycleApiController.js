// Importar el modelo de Bicycle
var Bicycle = require('../../models/bicycleModel');

// Controlador para obtener la lista de bicicletas y enviarla como respuesta en formato JSON
exports.bicycle_list = function (req, res) {
    res.status(200).json({bicycles: Bicycle.allBicycles});
}

// Controlador para crear una nueva bicicleta y enviarla como respuesta en formato JSON
exports.bicycle_create = function (req, res) {
    // Crear una nueva bicicleta utilizando los datos del cuerpo de la solicitud
    var bicycle = new Bicycle(req.body.id, req.body.color, req.body.model,[req.body.lat, req.body.lng]);
    // Agregar la nueva bicicleta al arreglo de bicicletas
    Bicycle.addBicycle(bicycle);
    // Enviar la bicicleta creada como respuesta en formato JSON
    res.status(200).json({bicycle: bicycle});
}

// Controlador para eliminar una bicicleta y enviar una respuesta vacía con código 204
exports.bicycle_delete = function (req, res) {
    // Eliminar la bicicleta con el ID proporcionado en el cuerpo de la solicitud
    Bicycle.removeById(req.body.id);
    // Enviar una respuesta vacía con código 204 (Sin Contenido)
    res.status(204).send();
}

// Controlador para actualizar una bicicleta y enviarla como respuesta en formato JSON
exports.bicycle_update = function (req, res) {
    // Encontrar la bicicleta con el ID proporcionado en el cuerpo de la solicitud
    var bicycle = Bicycle.findById(req.body.id);
    // Actualizar los datos de la bicicleta con los datos del cuerpo de la solicitud
    bicycle.id = req.body.id;
    bicycle.color = req.body.color;
    bicycle.model = req.body.model;
    bicycle.location = [req.body.lat, req.body.lng];
    // Actualizar la bicicleta en el arreglo de bicicletas
    Bicycle.update(bicycle);
    // Enviar la bicicleta actualizada como respuesta en formato JSON
    res.status(200).json({bicycle: bicycle});
}

// Autor: Andres Felipe Calderon Mancera
