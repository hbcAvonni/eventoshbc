"use client";

import Image from "next/image";
import Link from "next/link";

const artists = [
  {
    id: 1,
    name: "Abdón Alcaraz",
    image: "./assets/images/alcaraz.jpg", 
    slug: "Abdón Alcaraz",
  },
  {
    id: 2,
    name: "Rock",
    image: "./assets/images/rock.jpg", 
    slug: "Rock",
  },
  {
    id: 3,
    name: "Monólogo",
    image: "./assets/images/comedia.jpg", 
    slug: "Monólogo",
  },
];

export default function RosterSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-anton text-center text-[var(--primary-red)] mb-16">
          NUESTRO ROSTER
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Link key={artist.id} href="/roster" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100">
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-white text-2xl font-bold">{artist.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
