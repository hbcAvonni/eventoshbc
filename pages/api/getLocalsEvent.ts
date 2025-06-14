import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';

export default withCors(async function handler(req, res) {
    try {
        const eventoId = req.query.id as string;

        if (!eventoId) {
            return res.status(400).json({ error: "ID del evento no proporcionado" });
        }

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows] = await db.execute(`SELECT scbl.* FROM evento_establecimiento est INNER JOIN sponsors_coll_brand_locals scbl ON scbl_id=eves_establecimiento WHERE eves_evento = ?`, [eventoId]);

        res.status(200).json({ rows });
    } catch (error) {
        console.error("Error al obtener disponibilidad:", error);
        res.status(500).json({ error: "Error interno al consultar los locales del evento" });
    }
});