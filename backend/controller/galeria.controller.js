const galeriaModel = require('../models/galeria.models');

exports.verGaleria = async(req, res) => {
    try {
        const galeria = await galeriaModel.find();
        if (galeria) {
            return galeria
        } else {
            return res.status(404).json({ message: 'No se encontraron carpetas en la galeria' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener las carpetas de la galeria', error: error.message });
    }
}
