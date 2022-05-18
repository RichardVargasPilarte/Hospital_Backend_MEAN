/**
 * Hospitales
 * 
 *  ruta: /api/hospitales
 */

const { Router } = require('express'); // import Router from express
const { body } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router(); // create an instance of Router

router.get('/', validarJWT, getHospitales);

router.post(
    '/',
    [
        validarJWT,
        body('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    crearHospital
);

router.put('/:id',
    [
        validarJWT,
        body('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

router.delete('/:id', 
    validarJWT,
    borrarHospital
);



module.exports = router;