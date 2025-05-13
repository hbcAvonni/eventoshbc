// pages/cancel.tsx
'use client';

import { useEffect } from 'react';
import CryptoJS from "crypto-js";
import { useRouter, useSearchParams } from 'next/navigation';

export default function CancelPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const encryptedIdInscripcion = searchParams?.get("e73b8b9715be39953d9cd56ee7f1bda1329567ae") ?? ""; // idInscripcion en SHA1
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!secretKey) {
        console.error("La clave secreta no está definida en el entorno");
        return;
    }
    const bytesIdInscripcion = CryptoJS.AES.decrypt(encryptedIdInscripcion, secretKey);
    const idInscripcion = bytesIdInscripcion.toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        const actualizarInscripcion = async () => {
            if (!idInscripcion) return;

            const formData = new FormData();
            formData.append("idInscripcion", idInscripcion);
            formData.append("estadoInscripcion", "CANCELADO");

            try {
                const res = await fetch("./../api/updateInscripcion", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error("Error actualizando inscripción:", data.error);
                } else {
                    console.log("Inscripción actualizada:", data.message);
                }
            } catch (error) {
                console.error("Error de red al actualizar inscripción:", error);
            }
        };

        actualizarInscripcion();
    }, [idInscripcion]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Pago cancelado</h1>
            <p className="text-lg mb-2">Hubo un error al procesar tu pago.</p>
            <p className="text-md text-gray-700 mb-4">
                Puede que hayas cancelado la operación o que haya ocurrido un error en la transacción.
            </p>
            <button
                onClick={() => router.push('/')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Volver a la tienda
            </button>
        </main>
    );
}