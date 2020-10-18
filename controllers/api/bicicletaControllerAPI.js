const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req,res) {
    res.status(200).json({ 
        bicicletas : Bicicleta.allBicis
    })
}

exports.bicicleta_create = function(req,res){
    let bici = Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo, req.body.ubicacion);
    bici.save((err, biciSaved) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(biciSaved);
    })
}

exports.bicicleta_delete = function(req,res){
    Bicicleta.removeById(req.body.id);
   //204 es qn o tiene respuesta
    res.status(204).send();
}