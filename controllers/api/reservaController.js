var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

exports.reservas_list = async function (req, res) {
    Reserva.find({}, (err, docs) => {
        if (err) return res.status(400);
        return res.status(200).send(docs)
    });
}

exports.get_reserva = async function (req, res) {
    Reserva.findById(req.params.id, (err, user) => {
        if (err) return res.status(400);
        return res.status(200).send(user)
    });
}

exports.get_reserva_by_user = async function (req, res) {
    Reserva.find({ usuario: req.params.userId }, (err, user) => {
        if (err) return res.status(400);
        return res.status(200).send(user)
    });
}

exports.create_reserva = async function (req, res) {
    let reserva = new Reserva({
        usuario: req.body.userId,
        bicicleta: req.body.bicicletaId,
        desde: req.body.desde,
        hasta: req.body.hasta
    });
    try {
        await reserva.save();
        return res.status(200).send(reserva)
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.delete_reserva = async function (req, res) {
    try {
        await Reserva.findByIdAndDelete(req.params.id);
        return res.status(200).send()
    } catch {
        return res.status(400).send(error);
    }
}

exports.delete_all = async function (req, res) {
    Reserva.deleteMany({}, (err, success) => {
        if (err) return res.status(400).send(err);
        res.status(200).send();
    })
}

exports.update = async function (req, res) {
    Reserva.findByIdAndUpdate(
        req.body.id,
        {
            usuario: req.body.userId,
            bicicleta: req.body.bicicletaId,
            desde: req.body.desde,
            hasta: req.body.hasta
        },
        { new: true },
        (err, doc) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
}