var User = require('../../models/userModel')

exports.listUsers = async function(req,res){
    var users = await User.find({});
    res.status(200).json({users:users});
}

exports.createUser = async function(req,res){
    var user = User.createInstance(req.body.name);
    await user.save();
    res.status(200).json({user:user});
}

exports.bookUser = function(req, res) {
    User.findById(req.body.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ error: "Usuario no encontrado" });
            } else {
                user.reservations(req.body.startDate, req.body.endDate, req.body.bicycleId);
                res.status(200).json({ reservation: "Reserva realizada con éxito" });
            }
        })
        .catch(err => {
            console.error("Error al buscar usuario:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        });
}
