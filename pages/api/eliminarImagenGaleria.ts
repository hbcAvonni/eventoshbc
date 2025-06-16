import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";
import { S3 } from "aws-sdk";

const s3 = new S3({
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ mensaje: "Método no permitido" });
    }

    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ mensaje: "ID inválido" });
    }

    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_NAME!,
        });

        const [rows]: [Array<{ evga_imagen: string } & RowDataPacket>, unknown] = await conn.execute(
            "SELECT evga_imagen FROM eventos_galeria WHERE evga_id = ?",
            [parseInt(id)]
        );

        const imageUrl: string | undefined = rows?.[0]?.evga_imagen;
        if (imageUrl) {
            const key = imageUrl.split("/").pop();
            if (key) {
                await s3
                    .deleteObject({
                        Bucket: process.env.S3_BUCKET_NAME!,
                        Key: key,
                    })
                    .promise();
            }
        }

        await conn.execute("DELETE FROM eventos_galeria WHERE evga_id = ?", [
            parseInt(id),
        ]);

        await conn.end();

        return res.status(200).json({ mensaje: "Imagen eliminada correctamente" });
    } catch (error: unknown) {
        console.error("Error al eliminar imagen:", error); // <-- importante
        const mensaje =
            error instanceof Error ? error.message : "Error desconocido";
        return res.status(500).json({ mensaje });
    }
}