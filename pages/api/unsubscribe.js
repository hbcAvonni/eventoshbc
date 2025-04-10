import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { withCors } from '../../lib/withCors'; // Ajusta el path según tu estructura

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};


export default withCors(async function handler(req, res) {
// export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send("Email inválido");
    }

    const db = await mysql.createConnection(dbConfig);

    try {
      await db.execute("DELETE FROM subscribers WHERE email = ?", [email]);
      res.redirect('/unsubscribe-success');
    } catch (error) {
      res.status(500).send("Error al darse de baja");
    } finally {
      await db.end();
    }
  } else {
    res.status(405).send("Método no permitido");
  }
});
