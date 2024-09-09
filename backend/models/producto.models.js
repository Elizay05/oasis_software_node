const conexion = require('../config/connection');

const productoSchema = new conexion.Schema({
    nombre: {
        type: String,
        required: [true, 'Asignar un nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    categoria: {
        type: conexion.SchemaTypes.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatoria']
    },
    precio: {
        type: Number,
        default: [0, 'El precio por defecto es cero'],
        min: [0, 'El precio mínimo es cero']
    },
    stock: {
        type: Number,
        default: [0, 'El stock por defecto es cero'],
        min: [0, 'El stock por defecto es cero']
    },
    imagen: {
        type: String,
        required: [true, 'no existe la imagen o ruta']
    },
},{ versionKey: false });

const productoModel = conexion.model('Producto', productoSchema);

module.exports = productoModel;