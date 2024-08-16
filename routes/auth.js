//* host + /api/auth

const express = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const {check} = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-JWT');
const router = express.Router();


router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').notEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
)

router.post(
    '/',
    [
        check('email','El email debe ser valido').isEmail(),
        check('password','La contraseña debe ser valida > 6').isLength({min:6,max:30}),
        validarCampos
    ],
    loginUsuario
)

router.get('/renew',validarJWT,revalidarToken)

module.exports = router;