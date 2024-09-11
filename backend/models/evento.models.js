const conexion = require('../config/connection')

const eventoSchema = new conexion.Schema({
    nombre:{
        type: String,
        unique: true,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    descripcion:{
        type: String,
        required: true,
        minLength: [5, 'La descripción debe tener más de 5 caracteres'],
        maxLength: [300, 'La contraseña debe ser de menos de 300 caracteres']
    },
    aforo:{
        type:Number,
        required: true
    },
    entradas_diponibles:{
        type: Number,
        required: true,
    },
    precio_general:{
        type: Number,
        required: true,
        min : [0, 'El precio general no puede ser negativo']
    },
    precio_vip:{
        type: Number,
        required: true,
        min : [0, 'El precio VIP no puede ser negativo'],
        
    },
    imagen:{
        type: String
    },
    reservas: {
        type:Number,
        required: true
    }
}, { versionKey: false });

const eventoModel = conexion.model('Evento', eventoSchema);

module.exports = eventoModel;