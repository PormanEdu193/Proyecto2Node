const mongoose = require('mongoose');
const User = require('../../models/userModel');
const Reservation = require('../../models/reservationModel');
const Bicycle = require('../../models/bicycleModel');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Bicycle.deleteMany({});
    await User.deleteMany({});
    await Reservation.deleteMany({});
  });

  it('should create a new user instance', () => {
    const user = User.createInstance('John Doe');
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
  });

  it('should create a new reservation for a user', async () => {
    const user = User.createInstance('John Doe');
    await user.save();
    const bike = Bicycle.createInstance(1234, 'red', 'mountain', [-74.0060, 40.7128]);
    await bike.save();
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 3600000);

    const bicycleId = bike.id;
    await user.reservations(startDate, endDate, bicycleId, function(err,reservation){
        Reservation.find({}).populate('bike').populate('user').exec(function(err,reservations){
            expect(reservations.length).toBe(1);
            expect(reservations[0].user).toBe(user.id);
            expect(reservations[0].bicycle.code).toBe(bike.code);
            expect(reservations[0].startDate).toBe(startDate);
            expect(reservations[0].endDate).toBe(endDate);
        });
    });
  });

});