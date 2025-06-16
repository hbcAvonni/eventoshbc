"use client";
import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiTrash2, FiPlus, FiUpload } from "react-icons/fi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ImagenGaleria {
    evga_id: number;
    evga_imagen: string;
}

export default function GaleriaEventoPage() {
    const searchParams = useSearchParams();
    const eventId = searchParams?.get("id") ?? "";

    const [imagenes, setImagenes] = useState<ImagenGaleria[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const appRoot = document.getElementById('__next');
            if (appRoot) {
                Modal.setAppElement(appRoot);
            }
        }
    }, []);

    const fetchImagenes = async () => {
        const res = await fetch(`/api/getGaleria?id=${eventId}`);
        const data = await res.json();
        setImagenes(data.rows || []);
    };

    useEffect(() => {
        if (eventId) fetchImagenes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const handleUpload = async () => {
        if (!selectedFile || !eventId) return;

        const formData = new FormData();
        formData.append("imagen", selectedFile);
        formData.append("evento", eventId);

        const res = await fetch("/api/subirImagenGaleria", {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            setModalOpen(false);
            setSelectedFile(null);
            setPreview(null);
            fetchImagenes();
        }
    };

    const eliminarImagen = async (id: number) => {
        if (!confirm("¿Eliminar esta imagen?")) return;
        await fetch(`/api/eliminarImagenGaleria?id=${id}`, { method: "DELETE" });
        fetchImagenes();
    };

    if (!eventId) {
        return <p className="p-6 text-red-600">Error: evento no especificado.</p>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Galería del Evento</h2>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    <FiPlus /> Añadir Foto
                </button>
            </div>

            {imagenes.length === 0 ? (
                <p className="text-gray-500">Este evento no tiene imágenes aún.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagenes.map((img, index) => (
                        <div key={img.evga_id} className="relative group">
                            <img
                                src={img.evga_imagen}
                                alt={`Imagen ${index + 1}`}
                                className="w-full h-64 object-cover rounded shadow-md cursor-pointer galeria-img"
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsViewerOpen(true);
                                }}
                            />
                            <button
                                onClick={() => eliminarImagen(img.evga_id)}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 hover:text-red-700 hidden group-hover:block"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para subir foto */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Agregar Imagen"
                className="bg-white p-6 max-w-md mx-auto mt-20 rounded shadow-lg outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            >
                <h3 className="text-lg font-semibold mb-4">Subir Foto</h3>
                {preview && (
                    <img
                        src={preview}
                        alt="Vista previa"
                        className="w-64 h-64 object-contain rounded mb-4 mx-auto"
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setSelectedFile(file);
                            setPreview(URL.createObjectURL(file));
                        }
                    }}
                    className="mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={() => setModalOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
                        onClick={handleUpload}
                        disabled={!selectedFile}
                    >
                        <FiUpload /> Guardar
                    </button>
                </div>
            </Modal>

            {isViewerOpen && (
                <Lightbox
                    open={isViewerOpen}
                    close={() => setIsViewerOpen(false)}
                    index={currentIndex}
                    slides={imagenes.map((img) => ({ src: img.evga_imagen }))}
                    on={{ view: ({ index }) => setCurrentIndex(index) }}
                />
            )}
        </div>
    );
}