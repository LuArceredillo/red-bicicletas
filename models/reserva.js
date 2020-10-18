var mongoose = require('mongoose');
var moment = require('moment');

var reservaSchema = new mongoose.Schema({
    desde: Date,
    hasta: Date,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicicleta'
    }
});

reservaSchema.methods.diasDeReserva = function() {
    return moment(this.hasta).diff(moment(this.desde), 'days');
}

module.exports = mongoose.model('Reserva', reservaSchema);