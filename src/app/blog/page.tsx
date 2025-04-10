"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface BlogEntry {
  id: number;
  title: string;
  image: string;
  category: string;
  content: string;
}

interface EventoPasado {
  id: number;
  name: string;
  image: string;
  endDate: string;
}

const staticEntries: BlogEntry[] = [
  {
    id: 5,
    title: "3 formatos que están arrasando en eventos de marca",
    image: "/assets/images/escenario.jpg",
    category: "Tendencias",
    content:
      "Desde sesiones acústicas íntimas hasta DJ sets en rooftops, los eventos de marca están apostando por la autenticidad y la experiencia directa. Te contamos qué formatos son los más solicitados en 2025.",
  },
  {
    id: 6,
    title: "Nuevo artista confirmado para el verano 2025",
    image: "/assets/images/artistas.jpg",
    category: "Noticias Breves",
    content:
      "¡Se viene un bombazo! Muy pronto anunciaremos un fichaje que va a dar mucho que hablar en los escenarios de este verano. Permanece atento a nuestras redes.",
  },
];

export default function BlogPage() {
  const [eventosPasados, setEventosPasados] = useState<BlogEntry[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getEventos`);
        const data = await res.json();

        console.log('Eventos pasados:', data.eventosPasados);

        const formatted = data.eventosPasados.map((e: EventoPasado) => ({
          id: e.id,
          title: e.name,
          image: e.image,
          category: "Eventos Pasados",
          content: `Este evento finalizó el ${new Date(e.endDate).toLocaleDateString()}.`,
        }));

        setEventosPasados(formatted);
      } catch (error) {
        console.error("Error cargando eventos pasados:", error);
      }
    };

    fetchEventos();
  }, []);

  const fullEntries: BlogEntry[] = [
    ...eventosPasados,
    ...staticEntries,
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div
          className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url(/assets/images/blog.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="z-10 text-center px-4">
            <h1 className="text-white text-5xl md:text-7xl font-anton mb-4">BLOG</h1>
            <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto">
              Historias reales, experiencias únicas y tendencias que nos inspiran.
            </p>
          </div>
        </div>

        {/* Blog entries */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            {["Eventos Pasados", "Tendencias", "Noticias Breves"].map((section) => (
              <div key={section} className="mb-16">
                <h2 className="text-3xl font-bold text-sbk-blue mb-8">{section}</h2>
                {section === "Eventos Pasados" ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {fullEntries
                      .filter((entry) => entry.category === section)
                      .map((entry) => (
                        <div
                          key={entry.id}
                          className="flex flex-col items-center bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                          <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md">
                            <Image
                              src={entry.image}
                              alt={entry.title}
                              layout="fill"
                              objectFit="cover"
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{entry.title}</h3>
                            <p className="text-gray-600 text-sm">{entry.content}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {fullEntries
                      .filter((entry) => entry.category === section)
                      .map((entry) => (
                        <div
                          key={entry.id}
                          className="flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                          <div className="relative h-64 w-full">
                            <Image
                              src={entry.image}
                              alt={entry.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 flex flex-col justify-between">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2 font-anton">
                              {entry.title}
                            </h3>
                            <p className="text-gray-600 text-base">{entry.content}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
