var Usuario = require('../../models/usuario');

exports.usuarios_list = async function (req, res) {
    Usuario.find({}, (err, docs) => {
        if (err) return res.status(400);
        return res.status(200).send(docs)
    });
}

exports.get_usuario = async function (req, res) {
    Usuario.findById(req.params.id, (err, user) => {
        if (err) return res.status(400);
        return res.status(200).send(user)
    });
}

exports.create_usuario = async function (req, res) {
    let user = new Usuario({ name: req.body.name });
    try {
        await user.save();
        return res.status(200).send(user)
    } catch {
        return res.status(400).send('Error');
    }
}

exports.delete_usuario = async function (req, res) {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        return res.status(200).send()
    } catch {
        return res.status(400).send('Error');
    }
}

exports.delete_all = async function (req, res) {
    Usuario.deleteMany({}, (err, success) => {
        if (err) return res.status(400).send(err);
        res.status(200).send();
    })
}

exports.update = async function(req, res) {
    Usuario.findByIdAndUpdate(req.body.id, {name: req.body.name}, {new: true}, (err, doc) => {
        if (err) return res.status(400).send();
        res.status(200).send(doc);
    })
}