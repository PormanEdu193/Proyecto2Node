const Bicycle = require("../../models/bicycleModel");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");

describe("Bicycle API", () => {
    beforeAll((done) => {
        var mongoDB = "mongodb://localhost/test_db";
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", () => {
            console.log("We are connected to test database!");
            done();
        });
    });

    afterAll(async () => {
        await Bicycle.deleteMany({});
        await mongoose.connection.close();
        console.log("Connection to test database closed");
    });

    describe("GET Bicycles /", () => {
        it("Status 200", (done) => {
            request.get("http://localhost:3000/api/bicyclesApi", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("POST Bicycles /create", () => {
        it("Status 200", (done) => {
            const headers = { "content-type": "application/json" };
            const aBicycle = '{"code": 10, "color": "red", "model": "mountain", "lat": 40.7128, "lng": -74.0060}';
            request.post({
                headers: headers,
                url: "http://localhost:3000/api/bicyclesApi/create",
                body: aBicycle,
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("PUT Bicycles /update", () => {
        it("Status 200", (done) => {
            const headers = { "content-type": "application/json" };
            const aBicycle = '{"code": 10, "color": "blue", "model": "road", "lat": 40.7128, "lng": -74.0060}';
            request.put({
                headers: headers,
                url: "http://localhost:3000/api/bicyclesApi/update",
                body: aBicycle,
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("DELETE Bicycles /delete", () => {
        it("Status 204", (done) => {
            const headers = { "content-type": "application/json" };
            const aBicycle = '{"code": 10}';
            request.delete({
                headers: headers,
                url: "http://localhost:3000/api/bicyclesApi/delete",
                body: aBicycle,
            }, (error, response, body) => {
                expect(response.statusCode).toBe(204);
                done();
            });
        });
    });
  
});