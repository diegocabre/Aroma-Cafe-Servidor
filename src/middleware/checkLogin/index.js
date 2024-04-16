const db = require("../../database/db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const format = require("pg-format");
const { getCorreo } = require("../../database/querys/querys");

const validationFieldLogin = [
  check("email").notEmpty().isEmail(),
  check("password").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const value = [email];
    const query = format(getCorreo, ...value);
    const {
      rows: [usuario],
      rowCount,
    } = await db.query(query);
    if (!usuario || rowCount === 0) {
      return res.status(401).json({
        error: "Credenciales inválidas: correo electrónico no encontrado",
      });
    }
    const passwordEncriptada = usuario.contrasenya;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta) {
      return res
        .status(401)
        .json({ error: "Credenciales inválidas: contraseña incorrecta" });
    }
    req.user = usuario; // Almacenar información del usuario en el objeto de solicitud
    next();
  } catch (error) {
    console.error(
      "Error en el middleware de validación de credenciales:",
      error
    );
    return res.status(500).json({
      error: "Error en el servidor. Por favor, intenta nuevamente más tarde.",
    });
  }
};

module.exports = { validateCredentials, validationFieldLogin };
