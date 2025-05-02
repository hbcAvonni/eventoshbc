"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CryptoJS from "crypto-js";

export default function Formulario() {
  const searchParams = useSearchParams();
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const evento = searchParams?.get("evento");
  const nombreEvento = "";
  const establecimiento = "";

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    edad: "",
    telefono: "",
    evento: "",
    nombreEvento: "",
    email: "",
    foto: "",
    establecimiento: "",
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
  }, []);

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

  useEffect(() => {
    const fetchEvent = async () => {
      if (!evento) return;

      try {
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
        if (!secretKey) {
          console.error("La clave secreta no está definida en el entorno");
          return;
        }
        const encryptedId = evento;
        const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getEvento?id=${decryptedId}`);
        if (!res.ok) throw new Error("Error al obtener evento");

        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          evento: decryptedId,
          nombreEvento: data.rows[0].eve_nombre,
          establecimiento: data.rows[0].scbl_nombre + " (" + data.rows[0].scbl_direccion + ")"
        }));
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [evento, nombreEvento, establecimiento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isSubmitting) return;
  
    setIsSubmitting(true);
    setStatus("Enviando...");
  
    // Validaciones básicas
    if (formData.telefono.length < 9 || !/^\d+$/.test(formData.telefono)) {
      setStatus("El teléfono debe tener al menos 9 dígitos y solo números.");
      setIsSubmitting(false);
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("Por favor, ingrese un correo electrónico válido.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const formPayload = new FormData();
  
      // Añadir campos de texto
      for (const key in formData) {
        formPayload.append(key, formData[key as keyof typeof formData]);
      }
  
      // Añadir archivo
      if (eventImage) {
        formPayload.append("foto", eventImage);
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saveFormulario`, {
        method: "POST",
        body: formPayload,
      });
  
      if (!res.ok) throw new Error("Error al enviar el formulario");
  
      setStatus("Formulario enviado correctamente. Recibirás respuesta en breve.");
      setCooldown(100);
      setIsSubmitting(false);
  
      (e.target as HTMLFormElement).reset();
      setFormData({
        nombre: "",
        apellidos: "",
        edad: "",
        telefono: "",
        evento: evento || "",
        nombreEvento: nombreEvento ||"",
        email: "",
        foto: "",
        establecimiento: establecimiento ||"",
      });
      setEventImage(null);

      setTimeout(() => {
        window.location.href = "./";
      }, 1000);
    } catch (error) {
      setStatus("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-white">Cargando eventos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
                <label htmlFor="nombreEvento" className="block text-lg font-anton text-gray-700">
                  Evento
                </label>
                <input
                  type="text"
                  id="nombreEvento"
                  name="nombreEvento"
                  value={formData.nombreEvento}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                  readOnly
                />
                <input
                  type="hidden"
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  readOnly
                />
              </div>

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
                <label htmlFor="edad" className="block text-lg font-anton text-gray-700">
                  Edad
                </label>
                <input
                  type="text"
                  id="edad"
                  name="edad"
                  required
                  value={formData.edad}
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
                <label htmlFor="foto" className="block text-lg font-anton text-gray-700">
                  Foto
                </label>
                <input
                  type="file"
                  name="foto"
                  id="foto"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEventImage(e.target.files[0]);
                    }
                  }}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="establecimiento" className="block text-lg font-anton text-gray-700">
                  Establecimiento
                </label>
                <input
                  type="text"
                  id="establecimiento"
                  name="establecimiento"
                  value={formData.establecimiento}
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
