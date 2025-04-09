import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { user: 'admin' },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
