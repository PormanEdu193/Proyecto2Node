const Bicycle = require('../../models/bicycleModel');

// Controlador para obtener la lista de bicicletas y enviarla como respuesta en formato JSON
exports.bicycle_list = async function (req, res) {
    const bicycles = await Bicycle.allBicycles();
    res.status(200).json({bicycles});
}

// Controlador para crear una nueva bicicleta y enviarla como respuesta en formato JSON
exports.bicycle_create = async function (req, res) {
    // Crear una nueva bicicleta utilizando los datos del cuerpo de la solicitud
    const bicycle = Bicycle.createInstance(req.body.code, req.body.color, req.body.model, [req.body.lat, req.body.lng]);
    // Agregar la nueva bicicleta a la base de datos
    await Bicycle.add(bicycle);
    // Enviar la bicicleta creada como respuesta en formato JSON
    res.status(200).json({bicycle});
}

// Controlador para eliminar una bicicleta y enviar una respuesta vacía con código 204
exports.bicycle_delete = async function (req, res) {
    // Eliminar la bicicleta con el ID proporcionado en el cuerpo de la solicitud
    await Bicycle.removeByCode(req.body.code);
    // Enviar una respuesta vacía con código 204 (Sin Contenido)
    res.status(204).send();
}

// Controlador para actualizar una bicicleta y enviarla como respuesta en formato JSON
exports.bicycle_update = async function (req, res) {
    // Encontrar la bicicleta con el ID proporcionado en el cuerpo de la solicitud
    const bicycle = await Bicycle.findByCode(req.body.code);
    if (!bicycle) {
        return res.status(404).json({error: 'Bicicleta no encontrada'});
    }

    // Actualizar los datos de la bicicleta con los datos del cuerpo de la solicitud
    bicycle.color = req.body.color;
    bicycle.model = req.body.model;
    bicycle.location = [req.body.lat, req.body.lng];
    // Actualizar la bicicleta en la base de datos
    await bicycle.save();
    // Enviar la bicicleta actualizada como respuesta en formato JSON
    res.status(200).json({bicycle});
}