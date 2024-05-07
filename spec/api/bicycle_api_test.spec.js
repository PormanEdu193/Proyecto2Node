const Bicycle = require("../../models/bicycleModel");
var request = require("request");
var server = require("../../bin/www");
beforeEach(() => { Bicycle.allBicycles = [] });

describe("Bicycle API", () => {
    describe("GET Bicycles /", () => {
        it("Status 200", (done) => {
            expect(Bicycle.allBicycles.length).toBe(0);

            var a = new Bicycle(1, "rojo", "urbana", [-34.6012424, -58.3861497]);
            Bicycle.addBicycle(a);

            request.get("http://localhost:3000/api/bicyclesApi", function(error, response, body){
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

describe("Bicycle API", () => {
    describe("POST Bicycles /create", () => {
        it("Status 200", (done) => {
            var headers = {
                "content-type": "application/json"
            };
            var aBike = '{"id": 1, "color": "morado", "model": "gravel", "location": [-36.6012424, -58.3861497]}';
            request.post({
                headers: headers,
                url: "http://localhost:3000/api/bicyclesApi/create",
                body: aBike
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicycle.findById(1).color).toBe("morado");
                done();
            });
        });
    });
});

describe("Bicycle API", () => {
    describe("DELETE Bicycles /delete", () => {
        it("Status 204", (done) => {
            var aBike = new Bicycle(1, "morado", "gravel", [-36.6012424, -58.3861497]);
            var bBike2 = new Bicycle(2, "verde", "montaña", [-35.6012424, -59.3861497]);
            Bicycle.addBicycle(aBike);
            Bicycle.addBicycle(bBike2);


            request.delete({
                url: "http://localhost:3000/api/bicyclesApi/delete",
                json: true,
                body: { id: 1 } 
            }, function(error, response, body){
                expect(response.statusCode).toBe(204);
                expect(Bicycle.allBicycles.length).toBe(1);
                expect(Bicycle.allBicycles[0].id).toBe(2);

                done();
            });
        });
    });
})

describe("Bicycle API", () => {
    describe("PUT Bicycles /update", () => {
        it("Status 200", (done) => {
            var aBike = new Bicycle(1, "morado", "gravel", [-36.6012424, -58.3861497]);
            var bBike2 = new Bicycle(2, "verde", "montaña", [-35.6012424, -59.3861497]);
            Bicycle.addBicycle(aBike);
            Bicycle.addBicycle(bBike2);

            var headers = {
                "content-type": "application/json"
            };
            var aBikeUpdated = '{"id": 1, "color": "azul", "model": "gravel", "location": [-36.6012424, -58.3861497]}';
            request.put({
                headers: headers,
                url: "http://localhost:3000/api/bicyclesApi/update",
                body: aBikeUpdated
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicycle.findById(1).color).toBe("azul");
                done();
            });
        });
    });
});