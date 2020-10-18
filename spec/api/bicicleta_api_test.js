var mongoose = require('mongoose');
var axios = require('axios');
var Bicicleta = require("../../models/bicicleta");
var server = require('../../bin/www')
var URL = 'http://localhost:5000/api/bicicletas';
describe('Test Bicicleta', () => {

  beforeAll((done) => {
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, {
      useNewUrlParser: true
    })
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'))
    db.once('open', () => {
      console.log("conectado a la BD")
      done();
    })
  })

  afterEach((done) => {
    Bicicleta.deleteMany({}, (err, success) => {
      if (err) console.log(err);
      done();
    })
  })

  describe('POST BICICLETAS /create', () => {
    
    it('STATUS 200', (done) => {
      
      var headersR = {
        'Content-Type': 'application/json'
      };
      var aBici = {
        "code": 10,
        "color": "rojo",
        "modelo": "urbana",
        "ubicacion": [-54.36, -74.35]
      }
      axios.post(URL + '/create', aBici, {
          headers: headersR
        })
        .then(response => {
          expect(response.status).toBe(200);
          let bici = response.data;
          expect(bici.code).toBe(aBici.code)
          expect(bici.color).toBe(aBici.color)
          expect(bici.modelo).toBe(aBici.modelo)
          expect(bici.ubicacion[0]).toBe(Number(aBici.ubicacion[0]))
          expect(bici.ubicacion[1]).toBe(Number(aBici.ubicacion[1]))
          done();
        })
    })
  })
  describe('GET BICICLETAS / ', () => {
    it('Status 200', async () => {
      axios.get(URL, function (error, response, body) {
        let data = JSON.parse(body)
        expect(response.status).toBe(200);
        expect(data.bicicletas.length).toBe(0);
        done();
      })
    })
  })

  describe('PUT BICICLETAS /update', () => {
    it('STATUS 200', (done) => {
      var headersR = {
        'content-type': 'application/json'
      };
      var bici = new Bicicleta({
        code: 10,
        color: "azul",
        modelo: "urbana",
        ubicacion: [-54.36, -74.35]
      });
      bici.save();
      let update = {
        color: "azul",
        modelo: "Deportiva"
      }
      
      axios.put(`${URL}/${bici.code}/update`, update, {
          headers: headersR
        })
        .then(response => {
          expect(response.status).toBe(200);
          Bicicleta.findById(bici.code).exec((err, biciBD) => {
            expect(biciBD.modelo).toBe(update.modelo)
            expect(biciBD.color).toBe(update.color)
            done();
          })
        })
    })
  })

  describe('DELETE BICICLETAS /delete', () => {
    it('STATUS 204', (done) => {
      var headersR = {
        'content-type': 'application/json'
      };
      var aBici = {
        "code": 10,
        "color": "rojo",
        "modelo": "urbana"
      }
      Bicicleta.add(aBici);
      axios.delete(`http://localhost:3000/api/bicicletas/${aBici.code}/delete`, {
          headers: headersR
        })
        .then(response => {
          expect(response.status).toBe(204);
          expect(() => {
              Bicicleta.findById(aBici.code)
            })
            .toThrow(new Error(`No existe una bicicleta con el id ${aBici.code}`))
          done();
        })
    })
  })

})