import { NextApiRequest, NextApiResponse } from 'next';

export function withCors(handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Para desarrollo. Usa tu dominio en producción.
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        return handler(req, res);
    };
}