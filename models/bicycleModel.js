
var Bicycle = function(id, color, model, location){
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location;
}

Bicycle.prototype.toString = function(){
    return `id: ${this.id} | color: ${this.color} | model: ${this.model} | location: ${this.location}`;
}

Bicycle.allBicycles = [];

Bicycle.addBicycle = function(newBike){
    Bicycle.allBicycles.push(newBike);
    console.log(`Bicycle added: ${newBike.toString()}`);
}

Bicycle.findById = function(id){
    var bike = Bicycle.allBicycles.find(x => x.id == id);
    if(bike){
        console.log(`Bicycle found: ${bike.toString()}`);
        return bike;
    }else{
        throw new Error(`Bicycle not found with id: ${id}`);
    }
}

Bicycle.remove = function(bike){
    var index = Bicycle.allBicycles.indexOf(bike);
    if(index > -1){
        Bicycle.allBicycles.splice(index, 1);
        console.log(`Bicycle removed: ${bike.toString()}`);
    }else{
        throw new Error(`Bicycle not found with id: ${bike.id}`);
    }
}

Bicycle.removeById = function(id){
    var bike = Bicycle.findById(id);
    if(bike){
        Bicycle.remove(bike);
    }else{
        throw new Error(`Bicycle not found with id: ${id}`);
    }
}

Bicycle.update = function(bike){
    var index = Bicycle.allBicycles.findIndex(x => x.id == bike.id);
    if(index > -1){
        Bicycle.allBicycles[index] = bike;
        console.log(`Bicycle updated: ${bike.toString()}`);
    }else{
        throw new Error(`Bicycle not found with id: ${bike.id}`);
    }
}
var bicycle1 = new Bicycle(1, 'red', 'mountain', [4.6115, -74.0833]);
var bicycle2 = new Bicycle(2, 'blue', 'road', [4.6097, -74.0817]);
var bicycle3 = new Bicycle(3, 'green', 'urban', [4.7097, -75.0817]);
Bicycle.addBicycle(bicycle1);
Bicycle.addBicycle(bicycle2);
Bicycle.addBicycle(bicycle3);
// Export the Bicycle object
module.exports = Bicycle;