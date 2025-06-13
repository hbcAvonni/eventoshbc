import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ message: 'ID no proporcionado' });
    }

    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        await db.execute(`DELETE FROM eventos WHERE eve_id = ?`, [id]);
        await db.execute(`DELETE FROM evento_establecimiento WHERE eves_evento = ?`, [id]);
        await db.execute(`DELETE FROM eventos_fechas WHERE efec_evento = ?`, [id]);
        await db.end();

        return res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error("Error eliminando evento:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}