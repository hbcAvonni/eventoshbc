// pages/success.tsx
'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import CryptoJS from "crypto-js";
import { useRouter, useSearchParams } from 'next/navigation';


export default function SuccessPage() {
    const router = useRouter();
    const [ticketNumber, setTicketNumber] = useState<number | null>(null);
    const [maxTickets] = useState(200);
    const [qrValue, setQrValue] = useState("");
    const searchParams = useSearchParams();
    const encryptedNombre = searchParams?.get("4832ec78c988b19caba3064d548ebce5d09b86ed") ?? ""; // nombre en SHA1
    const encryptedApellidos = searchParams?.get("7314368089c5014ff04223e739859e4c99913aee") ?? ""; // apellidos en SHA1
    const encryptedNombreEvento = searchParams?.get("92f90dbcb244ccbaea462dbaf7982258aa915717") ?? ""; // nombreEvento en SHA1
    const encryptedFecha = searchParams?.get("c01a46e22e8d9c203a5a1ae07b5f2904780020d2") ?? ""; // fecha en SHA1
    const encryptedIdInscripcion = searchParams?.get("e73b8b9715be39953d9cd56ee7f1bda1329567ae") ?? ""; // idInscripcion en SHA1
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY ?? "";
    const [errorClave, setErrorClave] = useState<string | null>(null);

    useEffect(() => {
        if (!secretKey) {
            console.error("La clave secreta no está definida en el entorno");
            setErrorClave("Error: clave secreta no definida.");
        }
    }, [secretKey]);
    const bytesNombre = CryptoJS.AES.decrypt(encryptedNombre, secretKey);
    const nombre = bytesNombre.toString(CryptoJS.enc.Utf8);
    const bytesApellidos = CryptoJS.AES.decrypt(encryptedApellidos, secretKey);
    const apellidos = bytesApellidos.toString(CryptoJS.enc.Utf8);
    const bytesNombreEvento = CryptoJS.AES.decrypt(encryptedNombreEvento, secretKey);
    const nombreEvento = bytesNombreEvento.toString(CryptoJS.enc.Utf8);
    const bytesIdInscripcion = CryptoJS.AES.decrypt(encryptedIdInscripcion, secretKey);
    const idInscripcion = bytesIdInscripcion.toString(CryptoJS.enc.Utf8);
    const bytesFecha = CryptoJS.AES.decrypt(encryptedFecha, secretKey);
    const fecha = bytesFecha.toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        const actualizarInscripcion = async () => {
            if (!idInscripcion) return;

            const formData = new FormData();
            formData.append("idInscripcion", idInscripcion);
            formData.append("estadoInscripcion", "INSCRITO");

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

    useEffect(() => {
        const number = Math.floor(Math.random() * maxTickets) + 1;
        setTicketNumber(number);
        const qr = `TICKET#${number}-COMPRA_OK`;
        setQrValue(qr);
    }, [maxTickets]);

    const descargarPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const nombreEventoSanitizado = nombreEvento.replace(/\s+/g, "_").toLowerCase();
        const fechaSanitizada = new Date(fecha);
        const diaSemana = fechaSanitizada.toLocaleDateString("es-ES", {
            weekday: "long",
        })
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase();
        const dia = fechaSanitizada.getDate();
        const mes = fechaSanitizada.toLocaleDateString("es-ES", {
            month: "long",
        })
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase();
        const año = fechaSanitizada.getFullYear();
        const hora = fechaSanitizada.getHours().toString().padStart(2, "0");
        const minutos = fechaSanitizada.getMinutes().toString().padStart(2, "0");
        const fechaFormateada = `${diaSemana} ${dia} DE ${mes} DE ${año} – ${hora}:${minutos}`;

        // Encabezado
        doc.setFillColor(33, 150, 243); // Azul
        doc.rect(0, 0, pageWidth, 30, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text(`Nº ENTRADA: ${ticketNumber}`, pageWidth / 2, 20, { align: "center" });

        // Sección de datos
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setDrawColor(33, 150, 243);
        doc.roundedRect(15, 40, pageWidth - 30, 40, 3, 3);
        doc.text(`Nombre: ${nombre} ${apellidos}`, 20, 50);
        doc.text(`Evento: ${nombreEvento}`, 20, 58);
        doc.text(`Fecha: ${fechaFormateada}`, 20, 66);

        // Captura el SVG del QR
        const svg = document.querySelector("svg");

        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const img = new Image();
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);

                const pngFile = canvas.toDataURL("image/png");

                // Fondo QR
                doc.setFillColor(240, 240, 240);
                doc.roundedRect(pageWidth / 2 - 30, 90, 60, 60, 5, 5, "F");

                doc.addImage(pngFile, "PNG", pageWidth / 2 - 25, 95, 50, 50);
                doc.setFontSize(10);
                doc.text("Escanea para validar", pageWidth / 2, 155, { align: "center" });

                doc.save(`entrada_${nombreEventoSanitizado}_${ticketNumber}.pdf`);
            };

            img.src = url;
        } else {
            // Si no encuentra QR, igual descarga
            doc.save(`entrada_${nombreEventoSanitizado}_${ticketNumber}.pdf`);
        }
    };

    if (errorClave) {
        return <p className="text-center text-red-500">{errorClave}</p>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Compra realizada con éxito</h1>
            <p className="text-lg mb-4">
                Gracias por tu compra. Este es tu número de entrada:
            </p>

            {ticketNumber && (
                <div className="bg-gray-100 p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold">Entrada #{ticketNumber}</h2>
                    <div className="my-4 justify-center flex items-center flex-col">
                        <QRCode value={qrValue} size={128} />
                    </div>
                    <button
                        onClick={descargarPDF}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Descargar en PDF
                    </button>
                </div>
            )}

            <button
                onClick={() => router.push("/")}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Volver a la página principal
            </button>
        </main>
    );
}