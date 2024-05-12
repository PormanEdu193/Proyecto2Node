var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reservation = require('./reservationModel')

var userSchema = new Schema({
    name: String
})

userSchema.method.getUsers = function (){
    return this.find({}).exec();

}
userSchema.statics.createInstance = function(name) {
    return new this({
        name: name
    });
}

userSchema.method.findById = function(id) {
    return this.findOne({_id: id});
}

userSchema.method.addUser = function(newUser){
    return this.create(newUser);
}
userSchema.methods.reservations = async function(startDate,endDate,bicycleId){
    var reservation = Reservation.createInstance(startDate,endDate,bicycleId,this._id);
    console.log(reservation)
    await reservation.save();
}

module.exports = mongoose.model('User',userSchema)