const conexion = require('../config/connection');

const usuarioSchema = new conexion.Schema({
    nombre: {
        type: String,
        required: [true, 'Asignar un nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    cedula: {
        type: String,
        required: [true, 'La cedula es obligatoria']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    foto: {
        type: String
    }
},{ versionKey: false });

const usuarioModel = conexion.model('Usuario', usuarioSchema);

module.exports = usuarioModel;