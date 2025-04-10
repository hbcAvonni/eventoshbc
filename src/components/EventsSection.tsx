"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

interface Event {
  id: number;
  image: string;
  name: string;
  price: string;
  endDate: string;
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getEventos`);
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
    router.push(`/formulario?evento=${encodeURIComponent(event.name)}`);
  };

  return (
    <section className="py-12 bg-[var(--primary-red)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-anton text-center text-white mb-12">
          PRÓXIMOS EVENTOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col items-center">
              <div className="relative w-full mb-4 overflow-hidden rounded-md" style={{ height: "400px" }}>
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.name}
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

              <h3 className="text-white text-lg font-bold mb-1">{event.name}</h3>
              <p className="text-white mb-2">{parseFloat(event.price).toFixed(2)} €</p>

              <button
                onClick={() => comprarEvento(event)}
                className="bg-white hover:bg-gray-100 text-[var(--primary-red)] px-6 py-2 rounded font-bold transition-colors"
              >
                COMPRAR
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
