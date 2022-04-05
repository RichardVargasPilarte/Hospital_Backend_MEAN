const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.status(200).json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body,
    });

    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB,
            msg: 'Medico creado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarMedico = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Medico actualizado'
    });
}

const borrarMedico = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Medico borrado'
    });
}

module.exports = { getMedicos, crearMedico, actualizarMedico, borrarMedico };