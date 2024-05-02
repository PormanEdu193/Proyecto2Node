var Bicycle = require('../models/bicycleModel');

exports.bicycle_list = function (req, res) {
    res.render('bicycles/index', {bicycles: Bicycle.allBicycles});
}

exports.bicycle_create_get = function (req, res) {
    res.render('bicycles/create');
}

exports.bicycle_create_post = function (req, res) {
    var newBike = new Bicycle(req.body.id, req.body.color, req.body.model, [req.body.lat, req.body.lng]);
    Bicycle.addBicycle(newBike);
    res.redirect('/bicycles');
}

exports.bicycle_delete_post = function (req, res) {
    Bicycle.removeById(req.body.id);
    res.redirect('/bicycles');
}

exports.bicycle_update_get = function (req, res) {
    var bike = Bicycle.findById(req.params.id);
    res.render('bicycles/update', {bike: bike});
}

exports.bicycle_update_post = function (req, res) {
    var bike = Bicycle.findById(req.body.id);
    bike.id = req.body.id;
    bike.color = req.body.color;
    bike.model = req.body.model;
    bike.location = [req.body.lat, req.body.lng];
    Bicycle.update(bike);
    res.redirect('/bicycles');
}
   