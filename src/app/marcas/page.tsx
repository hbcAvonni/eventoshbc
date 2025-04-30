import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const brands = [
  {
    id: 1,
    name: "Marca 1",
    image: "./assets/images/fibro.png",
  },
  {
    id: 2,
    name: "Marca 2",
    image: "./assets/images/albatros.png",
  },
];

export default function MarcasPage() {
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
              MARCAS
            </h1>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-center">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-center p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={200}
                    height={100}
                    className="object-contain"
                  />
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
