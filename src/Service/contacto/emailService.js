const nodemailer = require("nodemailer");

exports.sendContactEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Mensaje del formulario de contacto",
    text: `
      Nombre: ${name}
      Correo electrónico: ${email}
      Mensaje: ${message}
    `,
  };

  await transporter.sendMail(mailOptions);
};
