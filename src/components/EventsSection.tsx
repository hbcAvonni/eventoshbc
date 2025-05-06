"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import CryptoJS from "crypto-js";

interface Event {
  eve_id: number;
  eve_imagen: string;
  eve_nombre: string;
  eve_precio: string;
  eve_fecha: string;
}

export default function EventsSection() {
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
        setEvents(data.eventosActivos);
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
        <h2 className="text-4xl md:text-5xl font-anton text-center text-white mb-12">
          PRÓXIMOS EVENTOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {events.map((event) => (
            <div key={event.eve_id} className="flex flex-col items-center">
              <div className="relative w-full mb-4 overflow-hidden rounded-md" style={{ height: "400px" }}>
                {event.eve_imagen ? (
                  <Image
                    src={event.eve_imagen}
                    alt={event.eve_nombre}
                    width={300}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>

              <h3 className="text-white text-lg mb-1">{event.eve_nombre}</h3>
              <p className="text-white mb-2">{parseFloat(event.eve_precio).toFixed(2)} €</p>

              <button
                onClick={() => comprarEvento(event)}
                className="bg-white hover:bg-gray-100 text-[var(--primary-red)] px-6 py-2 rounded font-bold transition-colors"
              >
                COMPRAR ENTRADAS
              </button>
            </div>
          ))}
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
