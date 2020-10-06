var Bicicleta = require("../../models/bicicleta");
var request = require("request");


describe("Bicileta API", () => {
  describe(" GET BICIS", () => {
    it("Status 200", () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var a = new Bicicleta(1, "rojo", "29", [-34.6, -58.38]);
      Bicicleta.add(a);
      request.get("http://localhost:5000/api/bicicletas", function (
        error,
        response,
        body
      ) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});

describe("Bicileta API", () => {
    describe("POST BICIS", () => {
      it("Status 200", () => {
        var headers= {'content-type' : 'application/json'};
        var aBici = '{"id":10, "color":"rojo","modelo":"urbana", "lat":-31,"long":-54}';
         request.post({
            headers: headers,
            url: "http://localhost:5000/api/create",
            body: aBici}, function(error,response,body){
                expect(response.statusCode).toBe(200);
                expect(targetBici.color).toBe("rojo");
                done();
            });
    });
    });
  });