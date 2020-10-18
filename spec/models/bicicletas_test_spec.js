var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");

beforeAll((done) => {
  var mongoDB = "mongodb://localhost/testdb";
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));
  db.once("open", () => {
    console.log("Nos conectamos a la base");
    done();
  });
});
afterEach((done) => {
  Bicicleta.deleteMany({}, (err, success) => {
    if (err) console.log(err);
    done();
  });
});

afterAll(() => {
  mongoose.connection.close();
})
describe("Bicicleta.createInstance", () => {
  it("crea una instancia de bici", () => {
    var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);
    expect(bici.color).toBe("verde");
    expect(bici.modelo).toBe("urbana");
    expect(bici.ubicacion[0]).toEqual(-34.5);
  });
});

describe("Bicicleta.allBicis", () => {
  it("comienza vacia", (done) => {
    Bicicleta.allBicis(function (err, bicis) {
      expect(bicis.length).toBe(0);
      done();
    });
  });
});

describe("Bicicleta.add", () => {
  it("Agregamos una", (done) => {
    var a = new Bicicleta({
      code: 1,
      color: "rojo",
      modelo: "29",
      ubicacion: [-34.6, -58.38],
    });
    Bicicleta.add(a, function (err, newBici) {
      if (err) console.log(err);
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toEqual(1);
        expect(bicis[0].code).toEqual(a.code);
        done();
      });
    });
  });
});
/*
describe("Bicicleta.findByCode", () => {
  it("Debe devolver la bici con code 1", (done) => {
    //chequeo la precondicion
    Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);
        done();
      });
      var a = new Bicicleta({
        id: 1,
        color: "rojo",
        modelo: "29",
        ubicacion: [-34.6, -58.38],
      });
      Bicicleta.add(a, function (err, newBici) {
         if (err) console.log(err);
      });
    
      var a2 = new Bicicleta({
        code: 2,
        color: "verde",
        modelo: "26",
        ubicacion: [-35.6, -55.38],
      });
      Bicicleta.add(a2, function (err, newBici) {
        if (err) console.log(err);
      });
    
    Bicicleta.findByCode(1,function(error, targetBici){
        expect(targetBici.code).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
        done();
    })
   
  });
});
*/
/*
beforeEach( () => {
    Bicicleta.allBicis = []
})

describe('Bicicleta.allBicis',() => {
    it('comienza vacia', () => {
         expect(Bicicleta.allBicis.length).toBe(0);
    })
})

describe('Bicicleta.add',() => {
    it('Agregamos una', () => {
        //chequeo la precondicion

        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', '29', [-34.60,-58.38]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);


    })
})


describe('Bicicleta.findById',() => {
    it('Debe devolver la bici con id 1', () => {
        //chequeo la precondicion
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1, 'verde', 'urbana', [-34.60,-58.38]);
        var aBici2 = new Bicicleta(2, 'verde', 'urbana', [-34.60,-58.38]);

        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);

    })
})
*/
