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
bicycleSchema.statics.allBicycles = function() {
    return this.find({}).exec();
};

// Método estático para añañdir una bicicleta
bicycleSchema.statics.add = function(newBike) {
    return this.create(newBike); // `create()` devuelve una promesa en Mongoose
}
// Método estático para encontrar una bicicleta por su código
bicycleSchema.statics.findByCode = function(code){
    return this.findOne({code: code});
}

// Método estático para eliminar una bicicleta por su código
bicycleSchema.statics.removeByCode = function(code){
    return this.deleteOne({code: code});
}

// Exportar el modelo de la bicicleta
module.exports = mongoose.model('Bicycle', bicycleSchema);

//Autor: Andres Felipe Calderon Mancera