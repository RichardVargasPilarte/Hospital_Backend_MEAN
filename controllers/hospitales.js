const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.status(200).json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital(
        {
            usuario: uid,
            ...req.body
        }
    );

    try {

        const hopitalDB = await hospital.save();
        res.status(200).json({
            ok: true,
            hospital: hopitalDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear hospital',
        });
    }
}

const actualizarHospital = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Hospital actualizado'
    });
}

const borrarHospital = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Hospital borrado'
    });
}

module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital };