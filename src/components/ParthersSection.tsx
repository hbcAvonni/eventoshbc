"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Parther {
  scbl_id: number;
  scbl_nombre: string;
  scbl_web: string;
  scbl_direccion: string;
  scbl_imagen: string;
}

export default function ParthersSection() {
  const [parthers, setParthers] = useState<Parther[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParthers = async () => {
      try {
        const res = await fetch('./api/getAllParthers');
        if (!res.ok) throw new Error("Error al obtener las marcas");
        const data = await res.json();
        setParthers(data.rows);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchParthers();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-anton text-center text-[var(--primary-red)] mb-5">
          NUESTROS PARTHERS
        </h2>

        <div className="bg-white py-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-center">
              {
                loading ? (
                  <p className="text-center text-gray-500">Cargando Parthers...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (parthers.map((parther) => (
                  <a
                    href={parther.scbl_web ?? "javascript:void(0);"}
                    target={parther.scbl_web ? "_blank" : ""}
                    rel="noopener noreferrer"
                    key={parther.scbl_id}
                  >
                    <div
                      key={parther.scbl_id}
                      className="flex items-center justify-center p-6 bg-gray-400 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                    >
                      <Image
                        src={parther.scbl_imagen}
                        alt={parther.scbl_nombre}
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
      </div>
    </section>
  );
}
