"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ImagenGaleria {
    evga_id: number;
    evga_imagen: string;
}

interface Props {
    eventoId: number;
}

export default function SeccionGaleria({ eventoId }: Props) {
    const [imagenes, setImagenes] = useState<ImagenGaleria[]>([]);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const res = await fetch(`/api/getGaleria?id=${eventoId}`);
                const data = await res.json();
                setImagenes(data.rows || []);
            } catch (error) {
                console.error("Error al cargar galería:", error);
            }
        };

        if (eventoId) fetchImagenes();
    }, [eventoId]);

    if (imagenes.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Aún no hay imágenes disponibles de este evento.
            </div>
        );
    }

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-anton text-[#3B82F6] mb-6 text-center">Galería del Evento</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                {imagenes.map((img, index) => (
                    <img
                        key={img.evga_id}
                        src={img.evga_imagen}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-64 object-cover rounded shadow-md cursor-pointer"
                        onClick={() => {
                            setCurrentIndex(index);
                            setIsViewerOpen(true);
                        }}
                    />
                ))}
            </div>

            <Lightbox
                open={isViewerOpen}
                close={() => setIsViewerOpen(false)}
                index={currentIndex}
                slides={imagenes.map((img) => ({ src: img.evga_imagen }))}
                on={{ view: ({ index }) => setCurrentIndex(index) }}
            />
        </section>
    );
}