import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import { withCors } from '../../lib/withCors'; // Ajusta el path según tu estructura

export default withCors(async function handler(req, res) {

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, apellidos, telefono, evento, email } = req.body;

  if (!nombre || !apellidos || !telefono || !evento || !email) {
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
      "INSERT INTO formularios (nombre, apellidos, telefono, evento, email) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellidos, telefono, evento, email]
    );

    await db.end();

    return res.status(200).json({ message: "Formulario guardado con éxito" });
  } catch (error) {
    console.error("Error guardando el formulario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});
