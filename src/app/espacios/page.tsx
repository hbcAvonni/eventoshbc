"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Local {
  scbl_id: number;
  scbl_nombre: string;
  scbl_web: string;
  scbl_direccion: string;
  scbl_imagen: string;
}

const espacios = [
  {
    id: 1,
    name: "Espacios Públicos",
    image: "./assets/images/publico.jpg",
  },
  {
    id: 2,
    name: "Espacios Privados",
    image: "./assets/images/privado.jpg",
  },
  {
    id: 3,
    name: " Espacios Cubiertos",
    image: "./assets/images/cubiertos.jpg",
  },
  {
    id: 4,
    name: "Espacios al Aire Libre",
    image: "./assets/images/libre.jpg",
  },
];

export default function EspaciosPage() {
  const [locals, setLocals] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const res = await fetch('./api/getLocals');
        if (!res.ok) throw new Error("Error al obtener las marcas");
        const data = await res.json();
        setLocals(data.rows);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchLocals();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <div
          className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('./assets/images/escenario.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-anton text-white mb-6">
              ESPACIOS
            </h1>
          </div>
        </div>

        {/* Local Grid */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-center">
              {
                loading ? (
                  <p className="text-center text-gray-500">Cargando Locales...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (locals.map((local) => (
                  <a
                    href={local.scbl_web ?? "javascript:void(0);"}
                    target={local.scbl_web ? "_blank" : ""}
                    rel="noopener noreferrer"
                    key={local.scbl_id}
                  >
                    <div
                      key={local.scbl_id}
                      className="flex items-center justify-center p-6 bg-gray-600 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                    >
                      <Image
                        src={local.scbl_imagen}
                        alt={local.scbl_nombre}
                        width={200}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </a>
                )))
              }
            </div>
          </div>
        </div>

        {/* Grid Espacios */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {espacios.map((espacio) => (
                <div
                  key={espacio.id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={espacio.image}
                      alt={espacio.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold font-anton text-sbk-blue">
                      {espacio.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
