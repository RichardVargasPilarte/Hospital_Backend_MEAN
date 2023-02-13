const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [hospitales, total] = await Promise.all([
        Hospital.find({}, 'nombre img hospital' )
        .skip(desde)
        .limit(5),

        Hospital.countDocuments()
    ])

    // const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.status(200).json({
        ok: true,
        hospitales,
        uid: req.uid,
        total
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

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid,
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar hospital',
        });
    }
}

const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Hospital borrado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar hospital',
        });
    }
}

module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital };