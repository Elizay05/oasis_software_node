const categoriaModel = require('../models/categoria.models');


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

        const categoriaExistente = await categoriaModel.findOne({ title: req.body.nombre });
        if (categoriaExistente) {
            return res.status(400).json({ message: "La categoria ya está registrada" });
        }

        const nuevo = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
        };

        let categoriaNueva = await categoriaModel.create(nuevo);
        if (categoriaNueva) {
            res.redirect(ruta);
        } else {
            res.status(404).json({ message: 'No se pudo registrar la categoria' });
        }
    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al registrar la categoria:", error: error.message });
    }
}

exports.editarCategoria = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const { nombre, descripcion, imagen } = req.body;


        const categoriaExistente = await categoriaModel.findOne({ title: nombre });
        if (categoriaExistente && categoriaExistente._id.toString() !== id) {
            return res.status(400).json({ message: "Esta categoria ya está registrada" });
        }
        
        const categoriaEditada = {
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen,
        };

        const actualizado = await categoriaModel.findByIdAndUpdate(id, categoriaEditada, { new: true });

        if (actualizado) {
            res.redirect(ruta);
        } else {
            res.status(404).json({ message: "Categoria no encontrada" });
        }

    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al editar la categoria:", error: error.message });
    }
}


exports.eliminarCategoria = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const categoria = await categoriaModel.findByIdAndDelete({_id: id});
        
        if (categoria) {
            res.send(ruta);
        } else {
            res.status(404).json({ message: 'Categoria no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocurrio un error al eliminar la categoria:", error: error.message });
    }
}