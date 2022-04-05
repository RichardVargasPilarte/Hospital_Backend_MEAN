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

router.get('/', getHospitales);

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
    [],
    actualizarHospital
);

router.delete('/:id', borrarHospital);



module.exports = router;