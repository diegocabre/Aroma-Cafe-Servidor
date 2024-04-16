const emailService = require("../services/emailService");

exports.sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await emailService.sendContactEmail(name, email, message);
    res
      .status(200)
      .json({ message: "Correo electrónico enviado correctamente" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al enviar el correo electrónico" });
  }
};
