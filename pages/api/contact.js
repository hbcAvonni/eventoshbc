import nodemailer from "nodemailer";
import { withCors } from '../../lib/withCors'; // Ajusta el path según tu estructura

export default withCors(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userMail = {
    from: `"HBC Avonni" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Hemos recibido tu mensaje",
    text: `Hola ${name},\n\nGracias por contactarnos. Hemos recibido tu mensaje y te responderemos en breve.\n\nTu mensaje:\n${message}`,
    html: `
      <p>Hola <strong>${name}</strong>,</p>
      <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en breve.</p>
      <p><strong>Tu mensaje:</strong></p>
      <blockquote>${message}</blockquote>
    `,
  };

  const adminMail = {
    from: `"HBC Avonni Web" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_ADMIN,
    subject: `Nuevo mensaje de contacto de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
    html: `
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <blockquote>${message}</blockquote>
    `,
  };

  try {
    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return res.status(500).json({ success: false, message: "Error al enviar el correo." });
  }
});
