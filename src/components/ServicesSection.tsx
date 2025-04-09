"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "ORGANIZACIÓN Y PRODUCCIÓN DE EVENTOS",
    image: "/assets/images/escenario.jpg",
    link: "/servicios#organizacion",
  },
  {
    id: 2,
    title: "PROMOCIÓN Y BOOKING DE ARTISTAS",
    image: "/assets/images/artistas.jpg",
    link: "/servicios#booking",
  },
  {
    id: 3,
    title: "SONIDO E ILUMINACIÓN",
    image: "/assets/images/sonido.jpg",
    link: "/servicios#sonido",
  },
  {
    id: 4,
    title: "VEHÍCULOS Y ESCENARIOS",
    image: "/assets/images/camiones.jpg",
    link: "/servicios#vehiculos",
  },
  {
    id: 5,
    title: "INFRAESTRUCTURA Y EQUIPAMIENTOS",
    image: "/assets/images/infraestructura.jpg",
    link: "/servicios#infraestructura",
  },
  {
    id: 6,
    title: "OTROS SERVICIOS",
    image: "/assets/images/servicios.jpg",
    link: "/servicios#otros",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-anton text-center text-[var(--primary-red)] mb-16">
          NUESTROS SERVICIOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-center text-xl md:text-2xl font-anton px-4">
                    {service.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
