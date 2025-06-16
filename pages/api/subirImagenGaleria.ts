import { IncomingForm } from 'formidable';
import fs from 'fs';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';
import s3 from '@/lib/s3';
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: { bodyParser: false },
};

export default withCors(async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error al parsear:", err);
            return res.status(500).json({ message: 'Error al procesar el formulario' });
        }

        const getField = (name: string) => Array.isArray(fields[name]) ? fields[name][0] : fields[name];
        const eventoId = getField('evento');

        if (!eventoId || !files.imagen) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        const image = Array.isArray(files.imagen) ? files.imagen[0] : files.imagen;
        const fileContent = fs.readFileSync(image.filepath);
        const fileExt = image.originalFilename?.split('.').pop() || 'jpg';
        const s3Key = `galeria/${uuidv4()}.${fileExt}`;

        try {
            const upload = await s3.upload({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: s3Key,
                Body: fileContent,
                ContentType: image.mimetype || 'image/jpeg',
            }).promise();

            const imageUrl = upload.Location;

            const db = await mysql.createConnection({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });

            await db.execute(
                `INSERT INTO eventos_galeria (evga_evento, evga_imagen) VALUES (?, ?)`,
                [eventoId, imageUrl]
            );

            await db.end();
            res.status(201).json({ message: 'Imagen subida correctamente', imageUrl });
        } catch (error) {
            console.error("Error al subir imagen:", error);
            res.status(500).json({ message: 'Error al subir imagen' });
        }
    });
});
