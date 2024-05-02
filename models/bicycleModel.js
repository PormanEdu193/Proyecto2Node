// Definición del constructor de objetos Bicycle
var Bicycle = function(id, color, model, location){
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location;
}

// Método toString para representar el objeto Bicycle como una cadena de texto
Bicycle.prototype.toString = function(){
    return `id: ${this.id} | color: ${this.color} | model: ${this.model} | location: ${this.location}`;
}

// Arreglo que contendrá todas las bicicletas
Bicycle.allBicycles = [];

// Método estático para agregar una bicicleta al arreglo
Bicycle.addBicycle = function(newBike){
    Bicycle.allBicycles.push(newBike);
    console.log(`Bicycle added: ${newBike.toString()}`);
}

// Método estático para buscar una bicicleta por su id
Bicycle.findById = function(id){
    var bike = Bicycle.allBicycles.find(x => x.id == id);
    if(bike){
        console.log(`Bicycle found: ${bike.toString()}`);
        return bike;
    }else{
        throw new Error(`Bicycle not found with id: ${id}`);
    }
}

// Método estático para remover una bicicleta del arreglo
Bicycle.remove = function(bike){
    var index = Bicycle.allBicycles.indexOf(bike);
    if(index > -1){
        Bicycle.allBicycles.splice(index, 1);
        console.log(`Bicycle removed: ${bike.toString()}`);
    }else{
        throw new Error(`Bicycle not found with id: ${bike.id}`);
    }
}

// Método estático para remover una bicicleta por su id
Bicycle.removeById = function(id){
    var bike = Bicycle.findById(id);
    if(bike){
        Bicycle.remove(bike);
    }else{
        throw new Error(`Bicycle not found with id: ${id}`);
    }
}

// Método estático para actualizar una bicicleta en el arreglo
Bicycle.update = function(bike){
    var index = Bicycle.allBicycles.findIndex(x => x.id == bike.id);
    if(index > -1){
        Bicycle.allBicycles[index] = bike;
        console.log(`Bicycle updated: ${bike.toString()}`);
    }else{
        throw new Error(`Bicycle not found with id: ${bike.id}`);
    }
}

// Crear algunas instancias de Bicycle
var bicycle1 = new Bicycle(1, 'red', 'mountain', [4.6115, -74.0833]);
var bicycle2 = new Bicycle(2, 'blue', 'road', [4.6097, -74.0817]);
var bicycle3 = new Bicycle(3, 'green', 'urban', [4.6136, -74.0850]);

// Agregar las bicicletas al arreglo
Bicycle.addBicycle(bicycle1);
Bicycle.addBicycle(bicycle2);
Bicycle.addBicycle(bicycle3);

// Exportar el objeto Bicycle para que pueda ser utilizado en otros archivos
module.exports = Bicycle;

// Autor: Andres Felipe Calderon Mancera
