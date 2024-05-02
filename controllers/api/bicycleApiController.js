var Bicycle = require('../../models/bicycleModel');

exports.bicycle_list = function (req, res) {
    res.status(200).json({bicycles: Bicycle.allBicycles});
}

exports.bicycle_create = function (req, res) {
    var bicycle = new Bicycle(req.body.id, req.body.color, req.body.model,[req.body.lat, req.body.lng]);
    Bicycle.addBicycle(bicycle);
    res.status(200).json({bicycle: bicycle});
}

exports.bicycle_delete = function (req, res) {
    Bicycle.removeById(req.body.id);
    res.status(204).send();
}

exports.bicycle_update = function (req, res) {
    var bicycle = Bicycle.findById(req.body.id);
    bicycle.id = req.body.id;
    bicycle.color = req.body.color;
    bicycle.model = req.body.model;
    bicycle.location = [req.body.lat, req.body.lng];
    Bicycle.update(bicycle);
    res.status(200).json({bicycle: bicycle});
}