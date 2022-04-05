const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const getBusquedas = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        await Usuario.find({ nombre: regex }),
        await Hospital.find({ nombre: regex }),
        await Medico.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos,
        msg: 'Todo esta bien',
        busqueda
    });
}

const getDocumentosColeccions = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene ser usuarios, hospitales o medicos'
            });
    }

    res.status(200).json({
        ok: true,
        resultados: data,
        busqueda,
        tabla
    });
}

module.exports = {
    getBusquedas,
    getDocumentosColeccions
}