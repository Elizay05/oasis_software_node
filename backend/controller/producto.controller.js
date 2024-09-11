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

        const productoExistente = await productoModel.findOne({ nombre: req.body.nombre });
        if (productoExistente) {
            req.flash('warning_msg', 'El producto ya está registrado');
            return res.redirect(ruta);
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
            req.flash('success_msg', 'Producto registrado exitosamente');
        } else {
            req.flash('warning_msg', 'Producto no encontrado');
        }
    } catch (error) {
        req.flash('error_msg', `Ocurrio un error: ${error.message}`);
    }

    res.redirect(ruta);
}

exports.editarProducto = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const { nombre, descripcion, categoria, precio, stock, imagen } = req.body;


        const productoExistente = await productoModel.findOne({ nombre });
        if (productoExistente && productoExistente._id.toString() !== id) {
            req.flash('warning_msg', 'Este producto ya está registrado');
            return res.redirect(ruta);
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
            req.flash('success_msg', 'Producto actualizado exitosamente');
        } else {
            req.flash('warning_msg', 'Producto no encontrado');
        }

    } catch (error) {
        req.flash('error_msg', `Ocurrio un error: ${error.message}`);
    }

    res.redirect(ruta);
}


exports.eliminarProducto = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const producto = await productoModel.findByIdAndDelete({_id: id});
        
        if (producto) {
            req.flash('success_msg', `Producto eliminado exitosamente`);
        } else {
            req.flash('warning_msg', `Producto no encontrado`);
        }
    } catch (error) {
        req.flash('error_msg', `Ocurrio un error: ${error.message}`);
    }

    res.send(ruta);
}