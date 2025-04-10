import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { withCors } from '../../lib/withCors'; // Ajusta el path según tu estructura

export default withCors(async function handler(req, res) {

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.execute('SELECT * FROM events');
  console.log(rows); 

  const ahora = new Date();

  const eventosActivos = (rows as Array<{ endDate: string }>).filter(evento => new Date(evento.endDate) >= ahora);
  const eventosPasados = (rows as Array<{ endDate: string }>).filter(evento => new Date(evento.endDate) < ahora);

  console.log("Eventos Activos:", eventosActivos); 
  console.log("Eventos Pasados:", eventosPasados); 

  res.status(200).json({ eventosActivos, eventosPasados });
});
