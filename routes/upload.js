/**
 * Subida de archivos
 * Ruta: localhost:3000/api/upload/medicos/123
 */

const { Router } = require('express'); // import Router from express

const expressFileUpload = require('express-fileupload');	// import fileUpload from express-fileupload

const { validarJWT } = require('../middlewares/validar-jwt'); // import validarJWT from middlewares/validar-jwt.js

const { fileUpload, retornarImagen } = require('../controllers/upload');

const router = Router(); // create an instance of Router

router.use(expressFileUpload()); // use fileUpload() from express-fileupload

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', validarJWT, retornarImagen);

module.exports = router;