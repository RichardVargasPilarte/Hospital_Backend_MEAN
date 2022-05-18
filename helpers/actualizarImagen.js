const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path); // Elimina la imagen anterior
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {
    switch (tipo) {
        case 'medicos':
            {
                const medico = await Medico.findById(id);
                if (!medico) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No existe un médico con ese ID',
                    });
                }

                const pathViejo = `./uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo);

                medico.img = nombreArchivo;
                await medico.save();
                return true
            }


        case 'hospitales':
            {
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No existe un hospital con ese ID',
                    });
                }

                const pathViejo = `./uploads/hospitales/${hospital.img}`;
                borrarImagen(pathViejo);

                hospital.img = nombreArchivo;
                await hospital.save();
                return true
            }

        case 'usuarios':
            {
                const usuarios = await Usuario.findById(id)
                if (!usuarios) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No existe un usuario con ese ID',
                    });
                }

                const pathViejo = `./uploads/usuarios/${usuarios.img}`;
                borrarImagen(pathViejo);

                usuarios.img = nombreArchivo;
                await usuarios.save();
                return true
            }
    }
}


module.exports = {
    actualizarImagen
}