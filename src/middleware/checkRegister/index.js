const db = require("../../database/db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const format = require("pg-format");
const { getCorreo } = require("../../database/querys/querys");
const { KEYTOKEN } = process.env;

const validationFieldRegistrer = [
  check("name")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("El nombre es requerido con minimo 3 caracteres")
    .isString()
    .withMessage("El nombre es requerido y debe ser un string")
    .matches(/^(?!.*(\w)\1\1)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/)
    .withMessage(
      "El nombre debe contener solo letras, espacios, apóstrofes y acentos, sin 3 letras iguales seguidas"
    ),
  check("lastName")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("El nombre es requerido con minimo 3 caracteres")
    .isString()
    .withMessage("El apellido es requerido y debe ser un string")
    .matches(/^(?!.*(\w)\1\1)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/)
    .withMessage(
      "El apellido debe contener solo letras, espacios, apóstrofes y acentos, sin 3 letras iguales seguidas"
    ),
  check("email").trim().notEmpty().isEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      const passwordregex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (passwordregex.test(value)) {
        return true;
      } else {
        throw new Error(
          "La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial como @$!%*?& y 8 caracteres como minimo"
        );
      }
    }),
  (req, res, next) => {
    try {
      const { password, passwordConfir } = req.body;
      if (password != passwordConfir) {
        res.status(400).json({
          msg: "No coincide la contraseña y la confirmación",
        });
      } else {
        validationResult(req).throw();
        return next();
      }
    } catch (error) {
      return res.status(400).send({ error: error.array() });
    }
  },
];

const validationCorreo = async (req, res, next) => {
  const { email } = req.body;
  try {
    const value = [email];
    const query = format(getCorreo, ...value);
    const data = await db.query(query);
    if (data.rows.length) {
      return res.status(409).json({
        errors: ["El usuario ya está registrado"],
      });
    } else {
      return next();
    }
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const verifytoken = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      throw new Error("Token de autorización no proporcionado");
    }
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, KEYTOKEN);
    console.log("token verificado");
    return next();
  } catch (error) {
    console.error("Error de verificación de token:", error);
    return res.status(401).json({ error: "No autorizado" });
  }
};

module.exports = { validationCorreo, validationFieldRegistrer, verifytoken };

