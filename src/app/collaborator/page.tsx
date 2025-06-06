"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Collaborator {
  scbl_id: number;
  scbl_nombre: string;
  scbl_web: string;
  scbl_direccion: string;
  scbl_imagen: string;
}

export default function MarcasPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const res = await fetch('./api/getCollaborators');
        if (!res.ok) throw new Error("Error al obtener las marcas");
        const data = await res.json();
        setCollaborators(data.rows);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
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
              COLABORADORES
            </h1>
          </div>
        </div>

        {/* Sponsor Grid */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-center">
              {
                loading ? (
                  <p className="text-center text-gray-500">Cargando Colaboradores...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : ( collaborators.map((collaborator) => (
                  <a
                    href={collaborator.scbl_web ?? "javascript:void(0);"}
                    target={collaborator.scbl_web ? "_blank" : ""}
                    rel="noopener noreferrer"
                    key={collaborator.scbl_id}
                  >
                    <div
                      key={collaborator.scbl_id}
                      className="flex items-center justify-center p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                    >
                      <Image
                        src={collaborator.scbl_imagen}
                        alt={collaborator.scbl_nombre}
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
      </main>
      <Footer />
    </>
  );
}
