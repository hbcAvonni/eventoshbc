import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { withCors } from '../../lib/withCors'; // Ajusta el path según tu estructura

export default withCors(async function handler(req, res) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.execute('SELECT * FROM eventos WHERE eve_activo = "ACTIVO" ORDER BY eve_fecha ASC');

  const ahora = new Date();

  const eventosActivos = (rows as Array<{ eve_fecha_fin: string }>).filter(evento => new Date(evento.eve_fecha_fin) >= ahora);
  const eventosPasados = (rows as Array<{ eve_fecha_fin: string }>).filter(evento => new Date(evento.eve_fecha_fin) < ahora);

  res.status(200).json({ eventosActivos, eventosPasados });
});
