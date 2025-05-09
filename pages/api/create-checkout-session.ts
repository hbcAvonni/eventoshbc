// pages/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withCors } from '@/lib/withCors';

const stripe = new Stripe(process.env.STRIPE_SECRETS_KEY!);

export default withCors(async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).end('Method Not Allowed');

    try {
        const { evento, costoEvento, nombreEvento, nombre, apellidos, email, fecha } = req.body;

        const precioFinal = Number(costoEvento);
        if (isNaN(precioFinal)) {
            throw new Error("El precio del evento no es un número válido");
        }

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
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cancel`,
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