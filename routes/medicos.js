/**
 * Hospitales
 * 
 *  ruta: /api/medicos
 */

 const { Router } = require('express'); // import Router from express
 const { body } = require('express-validator');
 
 const { validarCampos } = require('../middlewares/validar-campos');
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
 
 const router = Router(); // create an instance of Router
 
 router.get('/', getMedicos);
 
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
 
 router.put('/:id',
     [],
     actualizarMedico
 );
 
 router.delete('/:id', borrarMedico);
 
 
 
 module.exports = router;