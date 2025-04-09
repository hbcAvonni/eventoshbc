"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const artists = [
  {
    id: 1,
    name: "Abdón Alcaraz",
    image: "/assets/images/alcaraz.jpg",
  },
  {
    id: 2,
    name: "Rock",
    image: "/assets/images/rock.jpg",
  },
  {
    id: 3,
    name: "Monólogo",
    image: "/assets/images/comedia.jpg",
  },
];

export default function RosterPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image); 
  };

  const closeImageModal = () => {
    setSelectedImage(null); 
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <div
          className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url(/assets/images/roster.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-anton text-white mb-6">ROSTER</h1>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  className="relative overflow-hidden rounded-lg aspect-square"
                  style={{ cursor: "pointer" }} 
                  onClick={() => handleImageClick(artist.image)} 
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      layout="fill" 
                      objectFit="cover" 
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-white text-2xl font-bold">{artist.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal para mostrar la imagen ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            onClick={closeImageModal} 
          >
            <div
              className="relative max-w-3xl max-h-[80vh] cursor-pointer"
              onClick={(e) => e.stopPropagation()} 
            >
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
