const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email incorrecto'
            });
        }

        // Verificar password
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar token de jwt
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
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

const googleLogin = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDB) {
            // SI NO EXISTE EL USUARIO
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // EXISTE EL USUARIO
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en la BD
        await usuario.save();

        // Generar token de jwt
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    login,
    googleLogin
};