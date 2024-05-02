// Importar el modelo de Bicycle
var Bicycle = require('../models/bicycleModel');

// Controlador para obtener la lista de bicicletas y renderizar la vista 'bicycles/index'
exports.bicycle_list = function (req, res) {
    res.render('bicycles/index', {bicycles: Bicycle.allBicycles});
}

// Controlador para renderizar el formulario de creación de bicicletas
exports.bicycle_create_get = function (req, res) {
    res.render('bicycles/create');
}

// Controlador para manejar la creación de una bicicleta a través de una solicitud POST
exports.bicycle_create_post = function (req, res) {
    // Crear una nueva bicicleta utilizando los datos del formulario
    var newBike = new Bicycle(req.body.id, req.body.color, req.body.model, [req.body.lat, req.body.lng]);
    // Agregar la nueva bicicleta al arreglo de bicicletas
    Bicycle.addBicycle(newBike);
    // Redirigir al usuario de vuelta a la página de bicicletas
    res.redirect('/bicycles');
}

// Controlador para manejar la eliminación de una bicicleta a través de una solicitud POST
exports.bicycle_delete_post = function (req, res) {
    // Eliminar la bicicleta con el ID proporcionado en el cuerpo de la solicitud
    Bicycle.removeById(req.body.id);
    // Redirigir al usuario de vuelta a la página de bicicletas
    res.redirect('/bicycles');
}

// Controlador para renderizar el formulario de actualización de una bicicleta
exports.bicycle_update_get = function (req, res) {
    // Encontrar la bicicleta con el ID proporcionado en los parámetros de la URL
    var bike = Bicycle.findById(req.params.id);
    // Renderizar la vista 'bicycles/update' y pasarle la bicicleta encontrada
    res.render('bicycles/update', {bike: bike});
}

// Controlador para manejar la actualización de una bicicleta a través de una solicitud POST
exports.bicycle_update_post = function (req, res) {
    // Encontrar la bicicleta con el ID proporcionado en el cuerpo de la solicitud
    var bike = Bicycle.findById(req.body.id);
    // Actualizar los datos de la bicicleta con los datos del formulario
    bike.id = req.body.id;
    bike.color = req.body.color;
    bike.model = req.body.model;
    bike.location = [req.body.lat, req.body.lng];
    // Actualizar la bicicleta en el arreglo de bicicletas
    Bicycle.update(bike);
    // Redirigir al usuario de vuelta a la página de bicicletas
    res.redirect('/bicycles');
}

// Autor: Andres Felipe Calderon Mancera
