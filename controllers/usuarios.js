const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// TODO: Obtener usuarios
const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google img');

    res.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

// TODO: Crear un nuevo usuario
const crearUsuario = async (req, res = response) => {
    const { password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // TODO: Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);


        // TODO: Guarda USUARIO
        await usuario.save();

        // Generar token de jwt
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario: usuario, 
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

// TODO: Actualizar un Usuario
const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario es correcto
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario not found'
            });
        }

        // Actualización
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existemail = await Usuario.findOne({ email });

            if (existemail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

// TODO: Eliminar un usuario
const borrarUsuario = async (req, res) => {

    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario not found'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Se elimino el usuario'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        });
    }

}

module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }