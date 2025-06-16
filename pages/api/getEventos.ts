import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { toZonedTime } from 'date-fns-tz';
import { withCors } from '@/lib/withCors';

export default withCors(async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rawRows] = await db.execute('SELECT * FROM eventos ORDER BY eve_fecha ASC');

  const toMadridIso = (fecha: Date | string) => {
    const date = new Date(fecha);
    const zoned = toZonedTime(date, 'Europe/Madrid');
    return zoned.toISOString().slice(0, 19);
  };

  const rows = (rawRows as any[]).map(row => ({
    ...row,
    eve_fecha: toMadridIso(row.eve_fecha),
    eve_fecha_fin: toMadridIso(row.eve_fecha_fin),
  }));

  const ahora = new Date();

  const eventosActivos = rows.filter(evento => new Date(evento.eve_fecha_fin) >= ahora);
  const eventosPasados = rows.filter(evento => new Date(evento.eve_fecha_fin) < ahora);

  res.status(200).json({ eventosActivos, eventosPasados, rows });
});