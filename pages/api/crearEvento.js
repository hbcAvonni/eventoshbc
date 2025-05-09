import { IncomingForm } from 'formidable';
import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';
import { withCors } from '@/lib/withCors'; // Ajusta el path según tu estructura

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withCors(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error al parsear el formulario:', err);
      return res.status(500).json({ message: 'Error al procesar el formulario' });
    }

    try {
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const priceStr = Array.isArray(fields.price) ? fields.price[0] : fields.price;
      const endDate = Array.isArray(fields.endDate) ? fields.endDate[0] : fields.endDate;

      const numericPrice = parseFloat(priceStr);
      if (isNaN(numericPrice)) {
        return res.status(400).json({ message: 'Precio inválido' });
      }

      const image = Array.isArray(files.image) ? files.image[0] : files.image;

      const dir = path.join(process.cwd(), 'public/uploads/eventos');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const imageName = image.originalFilename || image.newFilename || 'imagen.jpg';
      const imagePath = path.join(dir, imageName);
      const dbImagePath = `./uploads/eventos/${imageName}`;

      // fs.renameSync(image.filepath, imagePath);
      fs.copyFileSync(image.filepath, imagePath);  // Copiar archivo
      fs.unlinkSync(image.filepath);               // Eliminar archivo temporal

      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [result] = await db.execute(
        "INSERT INTO events (name, price, endDate, createdAt, image) VALUES (?, ?, ?, ?, ?)",
        [name, numericPrice, endDate, new Date(), dbImagePath]
      );

      res.status(201).json({
        message: 'Evento creado exitosamente',
        eventId: result.insertId
      });
    } catch (error) {
      console.error('Error al crear el evento:', error);
      res.status(500).json({ message: 'Error al crear el evento' });
    }
  });
});
