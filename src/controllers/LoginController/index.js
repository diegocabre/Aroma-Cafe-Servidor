const jwt = require("jsonwebtoken");
const { KEYTOKEN } = process.env;

const login = async (req, res) => {
  try {
    const { email } = req.body;

    // Validación básica del correo electrónico
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Correo electrónico inválido" });
    }

    // Generar token JWT
    const token = jwt.sign({ email }, KEYTOKEN);

    // Devolver respuesta con el token
    return res.status(200).json({
      msg: "Acceso concedido",
      email: email,
      token: token,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al generar el token:", error);
    return res
      .status(500)
      .json({
        error: "Error en el servidor. Por favor, intenta nuevamente más tarde.",
      });
  }
};

module.exports = login;
