const usuarioModel = require('../models/usuario.models');
const logActivity = require('../../log');
const logRoute = './backend/logs/usuario.log';

exports.verUsuarios = async(req, res) => {
    try {
        const usuarios = await usuarioModel.find()
        if (usuarios) {
            const usuariosFormateados = usuarios.map(usuario => {
                const fechaNacimiento = new Date(usuario.fechaNacimiento);
                const fechaFormateada = fechaNacimiento.toISOString().split('T')[0];
                return {
                    ...usuario.toObject(), // Convertir el documento de Mongoose a un objeto JavaScript plano
                    fechaFormateada: fechaFormateada
                };
            });
            return usuariosFormateados;
        } else {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener los usuarios', error: error.message });
    }
}

exports.crearUsuario = async (req, res, ruta) => {
    try {

        const { nombre, email, password, cedula, fechaNacimiento, rol, foto } = req.body;

        const usuarioExistente = await usuarioModel.findOne({
            $or: [
                { nombre: nombre },
                { email: email },
                { cedula: cedula }
            ]
        });

        if (usuarioExistente) {
            req.flash('warning_msg', 'Este usuario ya está registrado');
            return res.redirect(ruta);
        }

        const nuevo = {
            nombre: nombre,
            email: email,
            password: password,
            cedula: cedula,
            fechaNacimiento: fechaNacimiento,
            rol: rol,
            foto: foto
        };

        let usuarioNuevo = await usuarioModel.create(nuevo);
        if (usuarioNuevo) {
            req.flash('success_msg', 'Usuario registrado exitosamente');
            logActivity.generateLog(logRoute, `Creación del usuario ${productoNuevo.nombre} at ${new Date()}\n`);
        } else {
            req.flash('warning_msg', 'Usuario no encontrado');
        }
    } catch (error) {
        res.status(400).json({ message: "Ocurrio un error al registrar el usuario:", error: error.message });
    }

    res.redirect(ruta);
}

exports.editarUsuario = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const { nombre, email, cedula, fechaNacimiento, rol, foto } = req.body;


        const usuarioExistente = await usuarioModel.findOne({
            $or: [
                { nombre: nombre },
                { email: email },
                { cedula: cedula }
            ],
            _id: { $ne: id }
        });

        if (usuarioExistente) {
            req.flash('warning_msg', 'Este usuario ya está registrado');
            return res.redirect(ruta);
        }
        
        const usuarioEditado = {
            nombre: nombre,
            email: email,
            cedula: cedula,
            fechaNacimiento: fechaNacimiento, 
            rol: rol, 
            foto: foto,
        };

        const actualizado = await usuarioModel.findByIdAndUpdate(id, usuarioEditado, { new: true });

        if (actualizado) {
            req.flash('success_msg', 'Usuario actualizado exitosamente');
            logActivity.generateLog(logRoute, `Actualización del usuario ${productoNuevo.nombre} at ${new Date()}\n`);
        } else {
            req.flash('warning_msg', 'Usuario no encontrado');
        }

    } catch (error) {
        req.flash('error_msg', `Ocurrió un error: ${error.message}`);
    }

    res.redirect(ruta);
}

exports.eliminarUsuario = async (req, res, ruta) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioModel.findByIdAndDelete({_id: id});
        
        if (usuario) {
            req.flash('success_msg', `Usuario eliminado exitosamente`);
            logActivity.generateLog(logRoute, `Eliminación del usuario ${productoNuevo.nombre} at ${new Date()}\n`);
        } else {
            req.flash('warning_msg', `Usuario no encontrado`);
        }
    } catch (error) {
        req.flash('error_msg', `Ocurrio un error: ${error.message}`);
    }

    res.send(ruta);
}