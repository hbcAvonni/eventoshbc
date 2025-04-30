"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Formulario() {
  const searchParams = useSearchParams();
  const evento = searchParams?.get("evento");

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    evento: "",
    email: "",
  });

  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);  // Tiempo de espera en segundos

  useEffect(() => {
    // Recuperar el cooldown desde localStorage cuando el componente se monta
    const savedCooldown = localStorage.getItem("cooldown");
    if (savedCooldown) {
      setCooldown(parseInt(savedCooldown));
    }

    if (evento) {
      setFormData((prev) => ({ ...prev, evento }));
    }
  }, [evento]);

  useEffect(() => {
    if (cooldown > 0) {
      // Guardar el valor de cooldown en localStorage
      localStorage.setItem("cooldown", cooldown.toString());

      const interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        localStorage.removeItem("cooldown");  // Eliminar cooldown cuando se desmonte el componente
      };
    }
  }, [cooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Si ya está enviando el formulario, no permitir otro envío

    setIsSubmitting(true);
    setStatus("Enviando...");

    // Validación del teléfono
    if (formData.telefono.length < 9) {
      setStatus("El teléfono debe tener al menos 9 dígitos.");
      setIsSubmitting(false);
      return;
    }
    if (!/^\d+$/.test(formData.telefono)) {
      setStatus("El teléfono solo puede contener números.");
      setIsSubmitting(false);
      return;
    }

    // Validación de correo electrónico
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("Por favor, ingrese un correo electrónico válido.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saveFormulario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar el formulario");

      setStatus("Formulario enviado correctamente. Recibirás respuesta en breve.");
      setCooldown(300);  // Activamos el tiempo de espera de 5 minutos (300 segundos)
      setIsSubmitting(false);

      (e.target as HTMLFormElement).reset();
      setFormData({
        nombre: "",
        apellidos: "",
        telefono: "",
        evento: evento || "",
        email: "",
      });
    } catch (error) {
      setStatus("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
      setIsSubmitting(false);
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
            backgroundImage: "url('./assets/images/concierto.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-anton text-white mb-6">
              FORMULARIO DE COMPRA
            </h1>
          </div>
        </div>

        {/* Formulario de Compra */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-lg font-anton text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                />
              </div>

              <div>
                <label htmlFor="apellidos" className="block text-lg font-anton text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  required
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-lg font-anton text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                  minLength={9} // Validación mínima de 9 dígitos
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
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                />
              </div>

              <div>
                <label htmlFor="evento" className="block text-lg font-anton text-gray-700">
                  Evento
                </label>
                <input
                  type="text"
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                  readOnly
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#60A5FA] text-white font-anton font-semibold rounded-md shadow-lg transition duration-300 hover:bg-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                  disabled={isSubmitting || cooldown > 0}
                >
                  {cooldown > 0
                    ? `Espere ${cooldown} segundos`
                    : "Enviar"}
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
