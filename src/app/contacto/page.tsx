"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Enviando...");
  
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
  
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (res.ok) {
      setStatus("Mensaje enviado correctamente. Recibirás respuesta en breve.");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

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
              CONTACTANOS
            </h1>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-anton text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-anton text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-anton text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#60A5FA] text-white font-anton font-semibold rounded-md shadow-lg transition duration-300 hover:bg-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                >
                  Enviar
                </button>
              </div>

              {status && (
                <p className="text-center font-anton text-lg text-[#3B82F6] mt-4">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
