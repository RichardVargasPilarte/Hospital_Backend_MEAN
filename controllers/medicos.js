const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [medicos, total] = await Promise.all([
        Medico.find({}, 'nombre img hospital' )
        .skip(desde)
        .limit(1),

        Medico.countDocuments()
    ])

    // const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

    res.status(200).json({
        ok: true,
        medicos,
        uid: req.uid,
        total
    });
}

const getMedicoById = async (req, res = response) => {

    const id = req.params._id;

    try {
        const medico = await Medico.findById(id).populate('usuario', 'nombre img').populate('hospital', 'nombre img');

        res.status(200).json({
            ok: true,
            medico,
        });  
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Médico no encontrado'
        });
    }
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

const actualizarMedico = async (req, res = response) => {

    const _id = req.params._id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(_id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        const cambiosMedicos = {
            ...req.body,
            usuario: uid,
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(_id, cambiosMedicos, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Medico actualizado',
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar médico',
        });
    }
}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Medico borrado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar médico',
        });
    }
}

module.exports = { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById };