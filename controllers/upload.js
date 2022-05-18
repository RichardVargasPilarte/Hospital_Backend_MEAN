const path = require('path');
const fs = require('fs');


const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizarImagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, hospital o usuario, tipo no válido'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No seleccionó ningún archivo',
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extensiones
    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida',
        });
    }

    // Generar nombre de archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Utilice el método mv() para colocar el archivo en algún lugar del servidor
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al subir el archivo',
            });
        }

        // Actualizar BD
        // if (tipo === 'usuarios') {
        //     actualizarImagen( tipo, id, nombreArchivo );
        // } else {
        //     actualizarImagen(tipo, id, nombreArchivo);
        // }

        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            // file: req.files.image,
            msg: 'Imagen subida correctamente',
            nombreArchivo
        });

    });
}


const retornarImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;


    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-image.jpg` );
        res.sendFile( pathImg );
    }
}

module.exports = {
    fileUpload,
    retornarImagen
}