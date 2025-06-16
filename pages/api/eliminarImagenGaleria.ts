import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';
import s3 from '@/lib/s3';

export default withCors(async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).json({ message: 'Método no permitido' });

    const id = req.query.id;
    if (!id) return res.status(400).json({ message: 'ID requerido' });

    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows]: any = await db.execute(
            `SELECT evga_imagen FROM eventos_galeria WHERE evga_id = ?`,
            [id]
        );

        if (rows.length === 0) return res.status(404).json({ message: 'Imagen no encontrada' });

        const url = new URL(rows[0].evga_imagen);
        const key = decodeURIComponent(url.pathname.slice(1)); // quita el '/' inicial

        await s3.deleteObject({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key
        }).promise();

        await db.execute(`DELETE FROM eventos_galeria WHERE evga_id = ?`, [id]);

        await db.end();
        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        console.error("Error al eliminar imagen:", error);
        res.status(500).json({ message: 'Error al eliminar imagen' });
    }
});