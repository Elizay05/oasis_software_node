const eventoModel = require('../models/evento.models');

exports.verEventos = async(req, res) => {
    try {
        const eventos = await eventoModel.find();
        if (eventos) {
            return eventos
        } else {
            return res.status(404).json({ message: 'No se encontraron los eventos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener los eventos', error: error.message });
    }
}

exports.crearEvento = async (req, res, ruta) => {
    try {

        const eventoExistente = await eventoModel.findOne({ title: req.body.nombre });
        if (eventoExistente) {
            return res.status(400).json({ message: "El evento ya está registrado" });
        }

        const nuevo = {
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            descripcion: req.body.descripcion,
            aforo: req.body.aforo,
            entradas_disponibles: req.body.entradas_disponibles,
            precio_general: req.body.precio_general,
            precio_vip: req.body.precio_vip,
            imagen: req.body.imagen,
        };

        let eventoNuevo = await eventoModel.create(nuevo);
        if (eventoNuevo) {
            res.redirect(ruta);
        } else {
            res.status(404).json({ message: 'No se pudo registrar el evento' });
        }
    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al registrar el evento:", error: error.message });
    }
}


exports.editarEvento = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const { nombre, fecha, descripcion, aforo, entradas_disponibles, precio_general, precio_vip, imagen } = req.body;


        const eventoExistente = await eventoModel.findOne({ title: nombre });
        if (eventoExistente && eventoExistente._id.toString() !== id) {
            return res.status(400).json({ message: "Este evento ya está registrado" });
        }
        
        const eventoEditado = {
            nombre: nombre,
            fecha: fecha,
            descripcion: descripcion,
            aforo: aforo,
            entradas_disponibles: entradas_disponibles,
            precio_general: precio_general,
            precio_vip: precio_vip,
            imagen: imagen,
        };

        const actualizado = await eventoModel.findByIdAndUpdate(id, eventoEditado, { new: true });

        if (actualizado) {
            res.redirect(ruta);
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }

    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al editar el evento:", error: error.message });
    }
}

exports.eliminarEvento = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const evento = await eventoModel.findByIdAndDelete({_id: id});
        
        if (evento) {
            res.send(ruta);
        } else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocurrio un error al eliminar el evento:", error: error.message });
    }
}