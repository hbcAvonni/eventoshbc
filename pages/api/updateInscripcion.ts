import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields } from 'formidable';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withCors(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const form = formidable({
    keepExtensions: true,
  });

  form.parse(req, async (err: Error | null, fields: Fields) => {
    if (err) {
      console.error("Error al parsear el formulario:", err);
      return res.status(500).json({ error: "Error al procesar el archivo" });
    }

    const idInscripcion = Array.isArray(fields.idInscripcion) ? fields.idInscripcion[0] : fields.idInscripcion;
    const estadoInscripcion = Array.isArray(fields.estadoInscripcion) ? fields.estadoInscripcion[0] : fields.estadoInscripcion;

    if (!idInscripcion || !estadoInscripcion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      await db.execute(
        "UPDATE eventos_inscripcion SET epi_estado = ? WHERE epi_id = ?",
        [estadoInscripcion, idInscripcion]
      );
      await db.end();

      return res.status(200).json({ message: "Formulario guardado con éxito" });
    } catch (error) {
      console.error("Error guardando el formulario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
});