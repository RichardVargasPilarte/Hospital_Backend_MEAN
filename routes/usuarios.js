/*
    Ruta: /api/usuarios
*/

const { Router } = require('express'); // import Router from express
const { body } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarAdminRole_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router(); // create an instance of Router

router.get( '/', validarJWT , getUsuarios );

router.post(
    '/',
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ]
    ,
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        validarAdminRole_o_MismoUsuario,
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').isEmail(),
        body('role', 'El role es obligatorio').not().isEmpty(), 
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id', validarJWT, borrarUsuario);



module.exports = router;