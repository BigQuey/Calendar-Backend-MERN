//TODO CRUD
const express = require('express')
const { validarJWT } = require("../middleware/validar-JWT");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = express.Router()
router.use(validarJWT);

//obtener eventos
router.get('/',getEventos)
//Crear un evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//Actualizar un evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//Borrar evento
router.delete('/:id',eliminarEvento)

module.exports = router;