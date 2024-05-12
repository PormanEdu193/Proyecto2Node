
const Bicycle = require('../../models/bicycleModel.js');
const mongoose = require('mongoose');

describe('Bicycle Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Bicycle.deleteMany({});
  });

  it('should create a new Bicycle instance', async () => {
    const bike = Bicycle.createInstance(123, 'red', 'mountain', [-74.0060, 40.7128]);
    expect(bike.code).toEqual(123);
    expect(bike.color).toEqual('red');
    expect(bike.model).toEqual('mountain');
    expect(bike.location).toEqual([-74.0060, 40.7128]);
  });

  it('should convert Bicycle instance to string', async () => {
    const bike = Bicycle.createInstance(123, 'red', 'mountain', [-74.0060, 40.7128]);
    expect(bike.toString()).toEqual('code: 123 | color: red | model: mountain | location: -74.006,40.7128');
  });

  it('should return all Bicycles', async () => {
    const bike1 = Bicycle.createInstance(123, 'red', 'mountain', [-74.0060, 40.7128]);
    const bike2 = Bicycle.createInstance(456, 'blue', 'road', [-73.9857, 40.7484]);
    await bike1.save();
    await bike2.save();

    const allBikes = await Bicycle.allBicycles();
    expect(allBikes.length).toEqual(2);
  });

  it('should add a new Bicycle', async () => {
    const newBike = { code: 789, color: 'green', model: 'hybrid', location: [-73.9764, 40.7710] };
    await Bicycle.add(newBike);
    bicycles = await Bicycle.allBicycles();
    expect(bicycles.length).toEqual(1);
    expect(bicycles[0].code).toEqual(789);
    expect(bicycles[0].color).toEqual('green');
    expect(bicycles[0].model).toEqual('hybrid');
    expect(bicycles[0].location).toEqual([-73.9764, 40.7710]);
  });

  it('should find a Bicycle by code', async () => {
    let bicycle_list = await Bicycle.allBicycles();
    expect(bicycle_list.length).toBe(0);
    const bike = Bicycle.createInstance(123, 'red', 'mountain', [-74.0060, 40.7128]);
    await bike.save();

    const foundBike = await Bicycle.findByCode(123);
    expect(foundBike.code).toEqual(123);
    expect(foundBike.color).toEqual('red');
    expect(foundBike.model).toEqual('mountain');
    expect(foundBike.location).toEqual([-74.0060, 40.7128]);
  });

  it('should return null when not finding a Bicycle by code', async () => {
    const foundBike = await Bicycle.findByCode(123);
    expect(foundBike).toBeNull();
  });

  it('should remove a Bicycle by code', async () => {
    let bicycle_list = await Bicycle.allBicycles();
    expect(bicycle_list.length).toBe(0);

    const bike = Bicycle.createInstance(123, 'red', 'mountain', [-74.0060, 40.7128]);
    await bike.save();

    await Bicycle.removeByCode(123);
    const foundBike = await Bicycle.findByCode(123);
    expect(foundBike).toBeNull();
  });

});