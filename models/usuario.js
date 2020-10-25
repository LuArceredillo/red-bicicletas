const { response } = require('express');
var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
let crypto = require('crypto');

const saltRounds = 10;

const uniqueValidator = require('mongoose-unique-validator');
const Token = require('../models/token');
const mailer = require('../mailer/mailer');
const { callbackPromise } = require('nodemailer/lib/shared');
 
const validateEmail = function(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var usuarioSchema = new mongoose.Schema({
    nombre: {
        type:String,
        trim:true,
        required: [true, "El nombre es obligatorio"]
    }
    ,
    email: {
        type:String,
        trim:true,
        required: [true, "El email es obligatorio"],
        lowercase:true,
        unique:true,
        validate:[validateEmail, 'Por favor, ingrese un email valido'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password:{
            type:String,
            required: [true, "la contraseña es obligatorio"] 
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado:{
        type:Boolean,
        default:false
},

});
usuarioSchema.plugin(uniqueValidator,'El {PATH} ya existe con otro usuario');

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password,this.password);
}

usuarioSchema.methods.reservar = async function(idBici, desde, hasta) {
    let reserva = new Reserva({
        desde: desde,
        hasta: hasta,
        usuario: this._id,
        bicicleta: idBici
    });
     reserva.save(cb);
   
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({
        _userId: this.id,
        token: crypto.randomBytes(16).toString('hex')
    });
     const emailDestination = this.email;
    
    token.save(function(err) {
        if (err) {
            return console.log(err.message);
        }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: emailDestination,
            subject: 'Verificación de cuenta',
            text: 'Hola,\n\n' + 'Por favor, para verificar su cuenta, haga click en el siguiente link:\n\n' + 'http://localhost:5000' + '\/token/confirmation\/' + token.token
        };

        mailer.sendMail(mailOptions, function(err) {
            if (err) {
                return console.log(err.message);
            }

            console.log('Se envio un email a  ' + emailDestination + '.');
        });
    });
}
usuarioSchema.methods.resetPassword = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err) {
        if (err) { return cb(err); }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password',
            text: 'Hola,\n\n' + 'Por favor, para resetear la contraseña de su cuenta haga click en este link:\n' + 'http://localhost:5000' + '\/resetPassword\/' + token.token + '\n'
        };

        mailer.sendMail(mailOptions, function(err) {
            if (err) { return cb(err); }
            console.log('Se envio un email para resetear la contraseña a: ' + email_destination + '.');
        });

        cb(null);
    });
};

usuarioSchema.methods.booking = function (bicycleId, from, to, cb) {  
    let booking = new Booking({
        user: this._id,
        bicycle: bicycleId, 
        from: from,
        to: to
    });
    booking.save(cb);
};


usuarioSchema.methods.resetPassword = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err) {
        if (err) { return cb(err); }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password',
            text: 'Hola,\n\n' + 'Por favor, para resetear la contraseña de su cuenta haga click en este link:\n' + 'http://localhost:5000' + '\/resetPassword\/' + token.token + '\n'
        };

        mailer.sendMail(mailOptions, function(err) {
            if (err) { return cb(err); }
            console.log('Se envio un email para resetear la contraseña a: ' + email_destination + '.');
        });

        cb(null);
    });
};







module.exports = mongoose.model('Usuario', usuarioSchema);

