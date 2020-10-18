const { response } = require('express');
var mongoose = require('mongoose');
var Reserva = require('./reserva');

var usuarioSchema = new mongoose.Schema({
    name: String
});

usuarioSchema.methods.reservar = async function(idBici, desde, hasta) {
    let reserva = new Reserva({
        desde: desde,
        hasta: hasta,
        usuario: this._id,
        bicicleta: idBici
    });
     reserva.save(cb);
   
}

module.exports = mongoose.model('Usuario', usuarioSchema);

