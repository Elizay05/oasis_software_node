const galeriaModel = require('../models/galeria.models');

// View all galleries
exports.verGaleria = async (req, res) => {
    try {
        const galeria = await galeriaModel.find();
        if (galeria) {
            return res.render('pages/galeria/listarFotos', { galeria });
        } else {
            return res.status(404).json({ message: 'No se encontraron galerías' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener las galerías', error: error.message });
    }
};


// consular una galería
exports.consultarGaleria = async (req, res) => {
    try {
        const galeria = await galeriaModel.findById(req.params.id);
        if (galeria) {
            return res.render('pages/galeria/listarFotos', { galeria: [galeria] });
        } else {
            return res.status(404).json({ message: 'No se encontraron galerías' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurio un error al obtener las galerías', error: error.message });
    }
};


// Create a new gallery
exports.crearGaleria = async (req, res, ruta) => {
    try {
        // Check if gallery already exists
        const galeriaExistente = await galeriaModel.findOne({ title: req.body.nombre });
        if (galeriaExistente) {
            return res.status(400).json({ message: "La galería ya está registrada" });
        }

        const nuevaGaleria = {
            nombre: req.body.nombre,
            imagen_portada: req.body.imagen_portada,
            fotos: req.body.fotos
        };

        let galeriaNueva = await galeriaModel.create(nuevaGaleria);
        if (galeriaNueva) {
            res.redirect(ruta); // Adjust this route as needed
        } else {
            res.status(404).json({ message: 'No se pudo registrar la galería' });
        }
    } catch (error) {
        res.status(400).json({ message: "Ocurrió un error al registrar la galería:", error: error.message });
    }
};

// Edit an existing gallery
exports.editarGaleria = async (req, res, ruta) => {
    try {
        const { id } = req.params;
        const { nombre, imagen_portada, fotos } = req.body;

        // Validar campos
        if (!nombre || !imagen_portada) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Check if another gallery with the same name exists
        const galeriaExistente = await galeriaModel.findOne({ nombre });
        if (galeriaExistente && galeriaExistente._id.toString() !== id) {
            return res.status(400).json({ message: "Esta galería ya está registrada" });
        }

        const galeriaEditada = {
            nombre: nombre,
            imagen_portada: imagen_portada,
            fotos: fotos,
        };

        const actualizado = await galeriaModel.findByIdAndUpdate(id, galeriaEditada, { new: true });

        if (actualizado) {
            res.redirect(ruta); // Adjust this route as needed
        } else {
            res.status(404).json({ message: "Galería no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: "Ocurrió un error al editar la galería:", error: error.message });
    }
};


// Delete a gallery
exports.eliminarGaleria = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const galeria = await galeriaModel.findByIdAndDelete(id);
        
        if (galeria) {
            res.send(ruta);
        } else {
            res.status(404).json({ message: 'Galería no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocurrio un error al eliminar el Galería:", error: error.message });
    }
};