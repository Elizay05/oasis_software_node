const categoriaModel = require('../models/categoria.models');
const productoModel = require('../models/producto.models');
const logActivity = require('../../logs')
const logRoute = './backend/logs/categoria.log'

exports.verCategorias = async(req, res) => {
    try {
        const categorias = await categoriaModel.find();
        if (categorias) {
            return categorias
        } else {
            return res.status(404).json({ message: 'No se encontraron categorias' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener las categorias', error: error.message });
    }
}


exports.crearCategoria = async (req, res, ruta) => {
    try {

        const categoriaExistente = await categoriaModel.findOne({ nombre: req.body.nombre });
        if (categoriaExistente) {
            req.flash('warning_msg', 'Esta categoria ya está registrada');
            return res.redirect(ruta);
        }

        const nuevo = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
        };

        let categoriaNueva = await categoriaModel.create(nuevo);
        if (categoriaNueva) {
            req.flash('success_msg', 'Categoría registrada exitosamente');
            logActivity.generateLog(logRoute, `Creado nueva categoria ${categoriaNueva.nombre} at ${new Date()}\n`);
        } else {
            req.flash('warning_msg', 'Categoría no encontrada');
        }
    } catch (error) {
        req.flash('error_msg', `Ocurrio un error: ${error.message}`);
    }

    res.redirect(ruta);
}

exports.editarCategoria = async (req, res, ruta) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, imagen } = req.body;

        const categoriaExistente = await categoriaModel.findOne({ nombre });
        if (categoriaExistente && categoriaExistente._id.toString() !== id) {
            req.flash('warning_msg', 'Esta categoría ya está registrada');
            return res.redirect(ruta);
        }

        const categoriaEditada = { nombre, descripcion, imagen };
        const actualizado = await categoriaModel.findByIdAndUpdate(id, categoriaEditada, { new: true });

        if (actualizado) {
            req.flash('success_msg', 'Categoría actualizada exitosamente');
            logActivity.generateLog(logRoute, `Actualizado la categoria ${actualizado.nombre} at ${new Date()}\n`);

        } else {
            req.flash('warning_msg', 'Categoría no encontrada');
        }
    } catch (error) {
        req.flash('error_msg', `Ocurrió un error: ${error.message}`);
    }

    res.redirect(ruta);
}


exports.eliminarCategoria = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const productos = await productoModel.find({ categoria: id });
        if (productos.length > 0) {
            req.flash('warning_msg', 'La categoría tiene productos asociados');
            return res.send(ruta);
        }

        const categoria = await categoriaModel.findByIdAndDelete({_id: id});
        
        if (categoria) {
            req.flash('success_msg', 'Categoría eliminada exitosamente');
            logActivity.generateLog(logRoute, `eliminado la categoria ${categoria.nombre} at ${new Date()}\n`);

        } else {
            req.flash('warning_msg', 'Categoría no encontrada');
        }
    } catch (error) {
        req.flash('error_msg', `Ocurrio un error: ${error.message}`);
    }

    res.send(ruta);
}