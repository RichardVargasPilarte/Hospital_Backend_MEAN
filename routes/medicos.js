/**
 * Hospitales
 * 
 *  ruta: /api/medicos
 */

const { Router } = require('express'); // import Router from express
const { body } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos');

const router = Router(); // create an instance of Router

router.get('/', validarJWT, getMedicos);

router.post(
    '/',
    [
        validarJWT,
        body('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        body('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ]
    ,
    crearMedico
);

router.put('/:_id',
    [
        validarJWT,
        body('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        body('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.get('/:_id', validarJWT, getMedicoById);

router.delete('/:id', validarJWT, borrarMedico);



module.exports = router;