/*
    Ruta del Login: /api/login
*/

const { Router } = require('express'); // import Router from express
const { login, googleLogin, renewToken } = require('../controllers/auth');

const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();


router.post('/', [
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google', [
        body('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleLogin
);

router.get('/renew', 
    validarJWT,
    renewToken
);

module.exports = router;