var Bicycle = require("../../models/bicycleModel")

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