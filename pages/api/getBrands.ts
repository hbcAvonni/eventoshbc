import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors'; // Ajusta el path según tu estructura

export default withCors(async function handler(req, res) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.execute('SELECT * FROM sponsors_coll_brand_locals WHERE scbl_tipo = "BRAND"');

  res.status(200).json({ rows });
});
