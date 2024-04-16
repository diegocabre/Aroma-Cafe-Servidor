const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/LoginController/index.js");
const {
  validateCredentials,
  validationFieldLogin,
} = require("../../middleware/checkLogin/index.js");

// Ruta para iniciar sesión
router.post("/login", validationFieldLogin, validateCredentials, login);

module.exports = router;
