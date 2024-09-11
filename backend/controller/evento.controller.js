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