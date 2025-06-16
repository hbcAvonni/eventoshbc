import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';

export default withCors(async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Método no permitido' });

    const eventId = req.query.id;
    if (!eventId) return res.status(400).json({ message: 'ID de evento requerido' });

    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows] = await db.execute(
            `SELECT evga_id, evga_imagen FROM eventos_galeria WHERE evga_evento = ?`,
            [eventId]
        );

        await db.end();
        return res.status(200).json({ rows });
    } catch (error) {
        console.error("Error al obtener la galería:", error);
        return res.status(500).json({ message: 'Error al obtener la galería' });
    }
});