import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';

type EventoCompleto = {
  eve_id: number;
  eve_nombre: string;
  eve_fecha: string;
  eve_precio: string;
  eve_imagen: string;
  eve_lugar: number;
  eve_activo: string;
  scbl_nombre: string;
};

export default withCors(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const id = req.query.id as string;
    if (!id) {
      return res.status(400).json({ error: "ID de evento no proporcionado" });
    }

    const [rows] = await db.execute(
      'SELECT eve.*, scbl_nombre, scbl_direccion FROM eventos eve LEFT JOIN sponsors_coll_brand_locals scbl ON scbl_id = eve_lugar AND scbl_tipo = "LOCALS" WHERE eve_id = ?',
      [id]
    );

    const eventos = rows as EventoCompleto[];

    if (eventos.length === 0) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.status(200).json({ rows: eventos });
  } catch (error) {
    console.error("Error de base de datos:", error);
    res.status(500).json({ error: "Error al obtener datos del evento" });
  }
});