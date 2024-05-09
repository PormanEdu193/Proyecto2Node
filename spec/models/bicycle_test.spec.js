var mongoose = require("mongoose")
var Bicycle = require("../../models/bicycleModel")


describe("Testing Bicycle", () => {
  beforeEach(function(done) {
    const mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to test database!');
      done();
    });
  });

  afterEach(async function() {
    try {
      await Bicycle.deleteMany({});
      console.log('All bicycles deleted successfully');
    } catch (err) {
      console.error(err);
    }
  });

  describe("Bicycle.createInstance", () => {
    it("crea una instancia de Bicycle", () => {
      var bike = Bicycle.createInstance(1, "rojo", "urbana", [-34.6012424, -58.3861497])
      expect(bike.code).toBe(1)
      expect(bike.color).toBe("rojo")
      expect(bike.model).toBe("urbana")
      expect(bike.location[0]).toEqual(-34.6012424)
      expect(bike.location[1]).toEqual(-58.3861497)
    })
  });

  describe("Bicycle.allBicycles", () => {
    it("comienza vacia",(done) => {
      Bicycle.allBicycles(function(err, bicycles){
        expect(bicycles.length).toBe(0)
        done()
      })
    })
  });

  describe("Bicycle.add", () => {
    it("agrega solo una bicicleta",(done) => {
      var bike = Bicycle.createInstance(1, "rojo", "urbana", [-34.6012424, -58.3861497])
      Bicycle.add(bike, function(err, newBike){
        if(err) console.error(err)
        Bicycle.allBicycles(function(err, bicycles){
          expect(bicycles.length).toEqual(1)
          expect(bicycles[0].code).toBe(1)
          done()
        })
      })
    })
  });
  
  

  

});





/*
beforeEach(() => { Bicycle.allBicycles = [] })

describe("Bicycle", () => {
  it("comienza vacia", () => {
    expect(Bicycle.allBicycles.length).toBe(0)
  })
})

describe("Bicycle.addBicycle", () => {
  it("agregamos una bicicleta", () => {
    expect(Bicycle.allBicycles.length).toBe(0)

    var a = new Bicycle(1, "rojo", "urbana", [-34.6012424, -58.3861497])
    Bicycle.addBicycle(a)

    expect(Bicycle.allBicycles.length).toBe(1)
    expect(Bicycle.allBicycles[0]).toBe(a)
  })
})

describe("Bicycle.findById", () => {
    it("debe devolver la bicicleta con id 1", () => {
        expect(Bicycle.allBicycles.length).toBe(0)
    
        var aBike = new Bicycle(1, "morado", "gravel", [-36.6012424, -58.3861497])
        var aBike2 = new Bicycle(2, "verde", "montaña", [-35.6012424, -59.3861497])
        Bicycle.addBicycle(aBike)
        Bicycle.addBicycle(aBike2)
    
        var targetBike = Bicycle.findById(1)
    
        expect(targetBike.id).toBe(aBike.id)
        expect(targetBike.color).toBe(aBike.color)
        expect(targetBike.model).toBe(aBike.model)
        expect(targetBike.location).toEqual(aBike.location)
    })
})

describe("Bicycle.removeById", () => {
    it("debe eliminar la bicicleta con id 1", () => {
        expect(Bicycle.allBicycles.length).toBe(0)
    
        var aBike = new Bicycle(1, "morado", "gravel", [-36.6012424, -58.3861497])
        var aBike2 = new Bicycle(2, "verde", "montaña", [-35.6012424, -59.3861497])
        Bicycle.addBicycle(aBike)
        Bicycle.addBicycle(aBike2)
    
        Bicycle.removeById(1)
    
        expect(Bicycle.allBicycles.length).toBe(1)
        expect(Bicycle.allBicycles[0].id).toBe(2)
    })
})
*/