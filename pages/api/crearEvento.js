import { IncomingForm } from 'formidable';
import fs from 'fs';
import mysql from 'mysql2/promise';
import { withCors } from '@/lib/withCors';
import s3 from '@/lib/s3';
import { v4 as uuidv4 } from 'uuid';

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
    const getField = (fieldName) => {
      const field = fields[fieldName];
      return Array.isArray(field) ? field[0] : field;
    };

    try {
      const name = getField('name') || '';
      const priceStr = getField('price');
      const price = priceStr !== undefined ? parseFloat(priceStr) : null;

      const endDateRaw = getField('endDateTime');
      const endDate = endDateRaw ? new Date(endDateRaw) : null;

      const maxPeopleStr = getField('maxPeople');
      const maxPeople = maxPeopleStr !== undefined ? parseInt(maxPeopleStr, 10) : null;

      const shortDescription = getField('shortDescription') || '';
      const longDescription = getField('longDescription') || '';
      const startDateTimeRaw = getField('startDateTime');
      const startDateTime = startDateTimeRaw ? new Date(startDateTimeRaw) : new Date();

      const isRecurring = getField('isRecurring') || 'NO';
      const recurringScheduleRaw = Array.isArray(fields.recurringSchedule) ? fields.recurringSchedule[0] : fields.recurringSchedule;

      const recurringSchedule = recurringScheduleRaw ? JSON.parse(recurringScheduleRaw) : [];

      if (isNaN(price)) {
        return res.status(400).json({ message: 'Precio inválido' });
      }

      // Validación y subida de imagen a S3
      let imageUrl = null;

      if (files.image) {
        const image = Array.isArray(files.image) ? files.image[0] : files.image;

        if (image?.filepath) {
          const fileContent = fs.readFileSync(image.filepath);
          const fileExt = image.originalFilename?.split('.').pop() || "jpg";
          const s3Key = `eventos/${uuidv4()}.${fileExt}`;
          const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Key,
            Body: fileContent,
            ContentType: image.mimetype || 'image/jpeg',
          };

          const uploadResult = await s3.upload(s3Params).promise();
          imageUrl = uploadResult.Location;
        }
      }

      // Conexión a la base de datos
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      // Guardar en la tabla eventos
      const [result] = await db.execute(
        `INSERT INTO eventos 
        (eve_nombre, eve_descripcion, eve_imagen, eve_detalles, eve_fecha, eve_fecha_fin, eve_precio, eve_cupos, eve_repetir) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          longDescription,
          imageUrl,
          shortDescription,
          startDateTime,
          endDate,
          price,
          maxPeople,
          isRecurring
        ]
      );

      const eventId = result.insertId;

      // Guardar horarios si es recurrente
      if (isRecurring === 'SI' && Array.isArray(recurringSchedule)) {
        for (const entry of recurringSchedule) {
          const dia = entry.day?.toUpperCase();
          const horaInicio = entry.start;
          const horaFin = entry.end;

          // Verificar valores
          if (dia && horaInicio && horaFin) {
            await db.execute(
              `INSERT INTO eventos_fechas (efec_evento, efec_dia, efec_hora_inicio, efec_hora_fin)
              VALUES (?, ?, ?, ?)`,
              [eventId, dia, horaInicio, horaFin]
            );
          }
        }
      }

      await db.end();
      res.status(201).json({
        message: 'Evento creado exitosamente',
        eventId: eventId
      });
    } catch (error) {
      console.error('Error al crear el evento:', error);
      res.status(500).json({ message: 'Error al crear el evento' });
    }
  });
});