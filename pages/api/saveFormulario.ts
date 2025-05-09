import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File, Fields, Files } from 'formidable';
import { withCors } from '@/lib/withCors';
import mysql from 'mysql2/promise';
import s3 from '@/lib/s3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  const form = formidable({
    keepExtensions: true,
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default withCors(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { fields, files } = await parseForm(req);

    const fecha = Array.isArray(fields.fecha) ? fields.fecha[0] : fields.fecha;
    const nombre = Array.isArray(fields.nombre) ? fields.nombre[0] : fields.nombre;
    const apellidos = Array.isArray(fields.apellidos) ? fields.apellidos[0] : fields.apellidos;
    const telefono = Array.isArray(fields.telefono) ? fields.telefono[0] : fields.telefono;
    const evento = Array.isArray(fields.evento) ? fields.evento[0] : fields.evento;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const edad = Array.isArray(fields.edad) ? fields.edad[0] : fields.edad;

    if (!fecha || !nombre || !apellidos || !telefono || !evento || !email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const image = Array.isArray(files.foto) ? files.foto[0] : files.foto;
    if (!image || !image.filepath) {
      return res.status(400).json({ error: "No se proporcionó la imagen correctamente" });
    }

    const fileContent = fs.readFileSync(image.filepath);
    const fileExt = image.originalFilename?.split('.').pop();
    const s3Key = `inscritos/${uuidv4()}.${fileExt}`;
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: s3Key,
      Body: fileContent,
      ContentType: image.mimetype || 'image/jpeg',
    };

    const uploadResult = await s3.upload(s3Params).promise();
    const imageUrl = uploadResult.Location;

    const fechaFormateada = fecha.includes("T") ? new Date(fecha) : `${fecha} 00:00:00`;

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await db.execute(
      `INSERT INTO eventos_inscripcion
        (epi_evento, epi_fecha, epi_nombre, epi_apellidos, epi_edad, epi_telefono, epi_email, epi_foto)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [evento, fechaFormateada, nombre, apellidos, edad, telefono, email, imageUrl]
    );

    await db.end();
    return res.status(200).json({ message: "Formulario guardado con éxito", fotoUrl: imageUrl });
  } catch (error) {
    console.error("Error inesperado:", error);
    return res.status(500).json({ error: "Error inesperado del servidor" });
  }
});