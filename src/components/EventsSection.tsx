"use client";

import { useEffect, useState } from "react";
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

interface Event {
  eve_id: number;
  eve_nombre: string;
  eve_imagen: string;
  eve_detalles: string;
  eve_cupos: string;
  eve_fecha: string;
  eve_fecha_fin: string;
  eve_precio: number;
  eve_lugar: string;
  idEncript: string;
}

export default function EventsSection() {
  const zonaEspaña = 'Europe/Madrid';
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('./api/getEventos');
        if (!res.ok) throw new Error("Error al obtener eventos");
        const data = await res.json();
        setEvents(data.rows || []);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center text-white">Cargando eventos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const comprarEvento = (event: Event) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!secretKey) {
      console.error("La clave secreta no está definida en el entorno");
      return;
    }

    const encryptedId = CryptoJS.AES.encrypt(event.eve_id.toString(), secretKey).toString();
    router.push(`/formulario?evento=${encodeURIComponent(encryptedId)}`);
  };

  return (
    <section className="py-12 bg-[var(--primary-red)]">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-anton text-center text-white mb-12">
          NUESTROS EVENTOS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {events.map((event) => {
            const ahora = new Date();
            const fechaInicio = new Date(event.eve_fecha);
            const fechaFin = new Date(event.eve_fecha_fin);

            let estado = '';
            let color = '';
            let button = 'COMPRAR ENTRADA';

            if (ahora < fechaInicio) {
              estado = 'Próximamente';
              color = 'text-blue-600';
            } else if (ahora >= fechaInicio && ahora <= fechaFin) {
              estado = 'En curso';
              color = 'text-green-600';
            } else {
              estado = 'Finalizado';
              color = 'text-red-600';
              button = "MAS INFORMACIÓN";
            }

            return (
              <div key={event.eve_id} className="flex flex-col items-center">
                <div className="relative w-full mb-4 overflow-hidden rounded-md bg-black" style={{ height: "400px" }}>
                  {event.eve_imagen ? (
                    <Image
                      onClick={() => comprarEvento(event)}
                      src={event.eve_imagen}
                      alt={event.eve_nombre}
                      width={300}
                      height={400}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>

                <h3 className="text-white text-lg">{event.eve_nombre}</h3>
                <p className="text-white">{event.eve_detalles ?? ""}</p>
                <h5 className={`${color}`}>{estado}</h5>

                <button
                  onClick={() => comprarEvento(event)}
                  className="bg-white hover:bg-gray-100 text-[var(--primary-red)] px-6 py-2 rounded font-bold transition-colors"
                >
                  {button}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--primary-red)] px-6 py-2 rounded font-bold transition-colors"
          >
            VER NUESTRO BLOG
          </Link>
        </div>
      </div>
    </section>
  );
}
