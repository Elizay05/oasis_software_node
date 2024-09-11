const conexion = require('../config/connection')

const galeriaSchema = new conexion.Schema({
    nombre:{
        type: String,
        unique: true,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    imagen_portada:{
        type: String,
        //default:
    },
    imagen:{
        type: String,
    }
}, { versionKey: false });

const galeriaModel = conexion.model('Galeria', galeriaSchema);

module.exports = galeriaModel;