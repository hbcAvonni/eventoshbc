import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File, Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { withCors } from '../../lib/withCors';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withCors(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const tempDir = path.join(process.cwd(), 'public/uploads/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const form = formidable({
    uploadDir: tempDir,
    keepExtensions: true,
  });

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      console.error("Error al parsear el formulario:", err);
      return res.status(500).json({ error: "Error al procesar el archivo" });
    }

    const nombre = Array.isArray(fields.nombre) ? fields.nombre[0] : fields.nombre;
    const apellidos = Array.isArray(fields.apellidos) ? fields.apellidos[0] : fields.apellidos;
    const telefono = Array.isArray(fields.telefono) ? fields.telefono[0] : fields.telefono;
    const evento = Array.isArray(fields.evento) ? fields.evento[0] : fields.evento;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const edad = Array.isArray(fields.edad) ? fields.edad[0] : fields.edad;

    if (!nombre || !apellidos || !telefono || !evento || !email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const image = Array.isArray(files.foto) ? files.foto[0] : files.foto;

    if (!image || typeof image === "undefined") {
      return res.status(400).json({ error: "No se proporcionó la imagen correctamente" });
    }

    const dir = path.join(process.cwd(), 'public/uploads/inscritos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const imageName = image.originalFilename || image.newFilename || 'imagen.jpg';
    const imagePath = path.join(dir, imageName);
    const dbImagePath = `./uploads/inscritos/${imageName}`;

    fs.copyFileSync(image.filepath, imagePath);
    fs.unlinkSync(image.filepath);

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      await db.execute(
        "INSERT INTO eventos_inscripcion (epi_evento, epi_fecha, epi_nombre, epi_apellidos, epi_edad, epi_telefono, epi_email, epi_foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [evento, new Date(), nombre, apellidos, edad, telefono, email, dbImagePath]
      );
      await db.end();

      return res.status(200).json({ message: "Formulario guardado con éxito" });
    } catch (error) {
      console.error("Error guardando el formulario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
});