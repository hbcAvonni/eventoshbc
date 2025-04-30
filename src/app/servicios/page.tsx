import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Service data
const services = [
  {
    id: "organizacion",
    title: "ORGANIZACIÓN Y PRODUCCIÓN DE EVENTOS",
    image: "./assets/images/escenario.jpg",
    description: "Ofrecemos soluciones integrales en la organización y producción de eventos, encargándonos de todos los detalles para que puedas disfrutar sin preocupaciones. Contamos con amplia experiencia en eventos corporativos, festivales, conciertos y celebraciones privadas.",
  },
  {
    id: "booking",
    title: "PROMOCIÓN Y BOOKING DE ARTISTAS",
    image: "./assets/images/artistas.jpg",
    description: "Gestionamos la contratación de artistas nacionales e internacionales para todo tipo de eventos. Trabajamos con un amplio roster de talentos y ofrecemos asesoramiento personalizado para encontrar el artista perfecto para cada ocasión.",
  },
  {
    id: "sonido",
    title: "SONIDO E ILUMINACIÓN",
    image: "./assets/images/sonido.jpg",
    description: "Disponemos de equipos de sonido e iluminación de última generación para garantizar la mejor experiencia audiovisual en cualquier tipo de evento. Nuestro equipo técnico se encarga de la instalación, operación y desmontaje.",
  },
  {
    id: "vehiculos",
    title: "VEHÍCULOS Y ESCENARIOS",
    image: "./assets/images/camiones.jpg",
    description: "Contamos con una flota de vehículos especializados y escenarios móviles adaptables a diferentes espacios y necesidades. Ofrecemos servicios de transporte y montaje para garantizar el éxito logístico de tu evento.",
  },
  {
    id: "infraestructura",
    title: "INFRAESTRUCTURA Y EQUIPAMIENTOS",
    image: "./assets/images/infraestructura.jpg",
    description: "Proporcionamos toda la infraestructura necesaria para eventos: carpas, vallado, generadores, baños portátiles, mobiliario y más. Nos ocupamos de todos los aspectos logísticos para que tu evento se desarrolle sin contratiempos.",
  },
  {
    id: "otros",
    title: "OTROS SERVICIOS",
    image: "./assets/images/servicios.jpg",
    description: "Ofrecemos servicios complementarios como catering, personal de seguridad, azafatas, fotografía y vídeo, diseño gráfico y comunicación, entre otros. Todo lo que necesitas para hacer de tu evento una experiencia única y memorable.",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <div
          className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url(./assets/images/banner.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-anton text-white mb-6">
              SERVICIOS
            </h1>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <div
                  key={service.id}
                  id={service.id}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
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
                  <div className="p-2">
                    <p className="text-[var(--primary-dark)] text-sm md:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-[var(--primary-red)] text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-anton mb-4">¿ESTÁS INTERESADO EN NUESTROS SERVICIOS?</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Contacta con nosotros para obtener más información o solicitar un presupuesto personalizado. Estaremos encantados de ayudarte a hacer realidad tu evento.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-white text-[var(--primary-red)] px-8 py-3 rounded-md font-bold transition-colors hover:bg-gray-100"
              >
                CONTACTAR AHORA
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
