const { Router } = require('express'); // import Router from express

const router = Router(); // create an instance of Router

const { getBusquedas, getDocumentosColeccions } = require('../controllers/busquedas'); // import busquedas from controllers/busquedas.js ');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:busqueda', validarJWT, getBusquedas);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccions);

module.exports = router;