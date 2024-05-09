var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definición del esquema de la bicicleta
var bicycleSchema = new Schema({
    code: Number,
    color: String,
    model: String,
    location: {
        type: [Number], // [Longitud, Latitud]
        index: { type: '2dsphere', sparse: true }
    }
});

// Método para crear una bicicleta
bicycleSchema.statics.createInstance = function(code,color, model, location){
    return new this({
        code: code,
        color: color,
        model: model,
        location: location
    });
}

// Método toString para representar el objeto Bicycle como una cadena de texto
bicycleSchema.methods.toString = function(){
    return `code: ${this.code} | color: ${this.color} | model: ${this.model} | location: ${this.location}`;
}

// Método estático para mostrar todas las bicicletas
bicycleSchema.statics.allBicycles = function(cb){
    return this.find({}, cb);
}

// Método estático para añañdir una bicicleta
bicycleSchema.statics.add = function(newBike, cb){
    this.create(newBike, cb);
}

// Exportar el modelo de la bicicleta
module.exports = mongoose.model('Bicycle', bicycleSchema);

//Autor: Andres Felipe Calderon Mancera