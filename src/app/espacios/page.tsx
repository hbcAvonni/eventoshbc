import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const espacios = [
  {
    id: 1,
    name: "Espacios Públicos",
    image: "/assets/images/publico.jpg",
  },
  {
    id: 2,
    name: "Espacios Privados",
    image: "/assets/images/privado.jpg",
  },
  {
    id: 3,
    name: " Espacios Cubiertos",
    image: "/assets/images/cubiertos.jpg",
  },
  {
    id: 4,
    name: "Espacios al Aire Libre",
    image: "/assets/images/libre.jpg",
  },
];

export default function EspaciosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <div
          className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/assets/images/escenario.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-anton text-white mb-6">
              ESPACIOS
            </h1>
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
