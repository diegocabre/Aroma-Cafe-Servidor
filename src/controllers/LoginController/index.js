const jwt = require("jsonwebtoken");
const { KEYTOKEN } = process.env;

const login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Correo electrónico inválido" });
    }

    // Simulando ya haber iniciado sesión
    if (req.user) {
      return res
        .status(409)
        .json({ error: "Ya has iniciado sesión anteriormente" });
    }

    const token = jwt.sign({ email }, KEYTOKEN);

    return res.status(200).json({
      msg: "Acceso concedido",
      email: email,
      token: token,
    });
  } catch (error) {
    console.error("Error al generar el token:", error);
    return res.status(500).json({
      error: "Error en el servidor. Por favor, intenta nuevamente más tarde.",
    });
  }
};

module.exports = login;
