import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors'; // Ajusta el path según tu estructura

const SECRET_KEY = process.env.SECRET_KEY || 'mi_clave_secreta';

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default withCors(async function handler(req, res) {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      const [subscribers] = await db.execute("SELECT news_email FROM newsletter WHERE news_activo = 'SI'");

      const { subject, message } = req.body;

      if (!subject || !message) {
        return res.status(400).json({ message: 'El asunto y el mensaje son requeridos' });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      for (const subscriber of subscribers) {
        const unsubscribeLink = `https://sbksocialclub.vercel.app/api/unsubscribe?email=${encodeURIComponent(subscriber.news_email)}`;

        const mailOptions = {
          from: `"SBK Social" <${process.env.EMAIL_USER}>`,
          to: subscriber.news_email,
          subject: subject,
          text: `${message}\n\nPara darte de baja visita: ${unsubscribeLink}`,
          html: `
            <div style="font-size: 20px; color: black; text-align: center;">
              <p>${message}</p>
            </div>
            <br />
            <br />
            <div style="font-size: 12px; color: #888888; text-align: center;">
              <p>Si no deseas seguir recibiendo nuestros correos, puedes darte de baja haciendo clic en el siguiente enlace:</p>
              <a href="${unsubscribeLink}" 
                 style="display:inline-block;padding:10px 20px;background-color:#f0f0f0;color:#888888;border-radius:4px;text-decoration:none;" target="_black">
                 Darse de baja
              </a>
            </div>
            <br />
            <br />
            <footer style="font-size: 10px; color: #888888; text-align: center;">
              <p>SBK Social | Todos los derechos reservados</p>
            </footer>
          `,
        };

        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error(`Error al enviar correo a ${subscriber.news_email}:`, error);
        }
      }

      return res.status(200).json({ message: 'Newsletter enviada correctamente a todos los suscriptores' });
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
});
