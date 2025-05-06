import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { withCors } from '../../lib/withCors'; // Ajusta el path según tu estructura

dotenv.config();

export default withCors(async function handler(req, res) {

// export default withCors(async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Correo electrónico no válido" });
    }

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [result] = await db.execute(
        "INSERT INTO newsletter (news_email) VALUES (?)",
        [email]
      );

      return res.status(200).json({ message: "Correo suscrito correctamente." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al guardar el correo." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
});
