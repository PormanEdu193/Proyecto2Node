var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var reservationSchema = new Schema({
    startDate: Date,
    endDate: Date,
    bicycle: {type:mongoose.Schema.ObjectId,ref:"Bicycle"},
    user: {type:mongoose.Schema.ObjectId,ref:"User"}
})

reservationSchema.statics.createInstance = function(startDate,endDate, idBicycle,idUser){
    return new this({
        startDate: startDate,
        endDate: endDate,
        bicycle: idBicycle,
        use: idUser
    });
}

reservationSchema.methods.reservationDays = function(){
    return moment(this.endDate).diff(moment(this.startDate),'days')+1;
}

module.exports = mongoose.model('Reservation',reservationSchema)
