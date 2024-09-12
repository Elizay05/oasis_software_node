const productoModel = require('../models/producto.models');


exports.verProductos = async(req, res) => {
    try {
        const productos = await productoModel.find().populate('categoria');
        if (productos) {
            return productos
        } else {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener los productos', error: error.message });
    }
}


exports.crearProducto = async (req, res, ruta) => {
    try {

        const productoExistente = await productoModel.findOne({ title: req.body.nombre });
        if (productoExistente) {
            return res.status(400).json({ message: "El producto ya está registrado" });
        }

        const nuevo = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            precio: req.body.precio,
            stock: req.body.stock,
            imagen: req.body.imagen,
        };

        let productoNuevo = await productoModel.create(nuevo);
        if (productoNuevo) {
            res.redirect(ruta);
        } else {
            res.status(404).json({ message: 'No se pudo registrar el producto' });
        }
    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al registrar el producto:", error: error.message });
    }
}

exports.editarProducto = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const { nombre, descripcion, categoria, precio, stock, imagen } = req.body;


        const productoExistente = await productoModel.findOne({ title: nombre });
        if (productoExistente && productoExistente._id.toString() !== id) {
            return res.status(400).json({ message: "Este producto ya está registrado" });
        }
        
        const productoEditado = {
            nombre: nombre,
            descripcion: descripcion,
            categoria: categoria,
            precio: precio,
            stock: stock,
            imagen: imagen,
        };

        const actualizado = await productoModel.findByIdAndUpdate(id, productoEditado, { new: true });

        if (actualizado) {
            res.redirect(ruta);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }

    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al actualizar el producto:", error: error.message });
    }
}

exports.eliminarProducto = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const producto = await productoModel.findByIdAndDelete({_id: id});
        
        if (producto) {
            res.send(ruta);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocurrio un error al eliminar el producto:", error: error.message });
    }
}