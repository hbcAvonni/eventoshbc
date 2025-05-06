import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { withCors } from '../../lib/withCors';

const SECRET_KEY = process.env.SECRET_KEY;

export default withCors(async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.execute(
      `SELECT * FROM usuarios WHERE usr_clave = SHA1(?) AND (usr_login = ? OR usr_email = ?) AND (usr_tipo = 1 OR usr_tipo = 2)`,
      [password, username, username]
    );

    if (rows.length > 0) {
      const token = jwt.sign({ user: rows[0].usr_login }, SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
});