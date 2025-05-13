// pages/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withCors } from '@/lib/withCors';
import CryptoJS from "crypto-js";

const stripe = new Stripe(process.env.STRIPE_SECRETS_KEY!);

export default withCors(async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).end('Method Not Allowed');
    console.log("Request body:", req.body);

    try {
        const { idInscripcion, evento, costoEvento, nombreEvento, nombre, apellidos, email, fecha } = req.body;

        const precioFinal = Number(costoEvento);
        if (isNaN(precioFinal)) {
            throw new Error("El precio del evento no es un número válido");
        }
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
        if (!secretKey) {
            console.error("La clave secreta no está definida en el entorno");
            return;
        }

        const encryptedNombre = CryptoJS.AES.encrypt(nombre.toString(), secretKey).toString();
        const encryptedApellidos = CryptoJS.AES.encrypt(apellidos.toString(), secretKey).toString();
        const encryptedNombreEvento = CryptoJS.AES.encrypt(nombreEvento.toString(), secretKey).toString();
        const encryptedFecha = CryptoJS.AES.encrypt(fecha, secretKey).toString();
        const encryptedIdInscripcion = CryptoJS.AES.encrypt(idInscripcion.toString(), secretKey).toString();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Entrada para ${nombre} ${apellidos} - Evento ${nombreEvento}`,
                        },
                        unit_amount: Math.round(precioFinal * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin}/stripe/success?4832ec78c988b19caba3064d548ebce5d09b86ed=${encodeURIComponent(encryptedNombre)}&7314368089c5014ff04223e739859e4c99913aee=${encodeURIComponent(encryptedApellidos)}&92f90dbcb244ccbaea462dbaf7982258aa915717=${encodeURIComponent(encryptedNombreEvento)}&c01a46e22e8d9c203a5a1ae07b5f2904780020d2=${encodeURIComponent(encryptedFecha)}&e73b8b9715be39953d9cd56ee7f1bda1329567ae=${encodeURIComponent(encryptedIdInscripcion)}`,
            cancel_url: `${req.headers.origin}/stripe/cancel?e73b8b9715be39953d9cd56ee7f1bda1329567ae=${encodeURIComponent(encryptedIdInscripcion)}`,
            metadata: {
                nombre,
                apellidos,
                evento,
                fecha,
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando sesión de pago' });
    }
});