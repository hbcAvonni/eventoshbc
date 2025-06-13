"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CryptoJS from "crypto-js";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
registerLocale("es", es);

interface Local {
  scbl_id: number;
  scbl_nombre: string;
  scbl_direccion: string;
}

export default function Formulario() {
  const searchParams = useSearchParams();
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const evento = searchParams?.get("evento");
  const [datosEvento, setDatosEvento] = useState<{
    idEvento: number;
    nombreEvento: string;
    descripcion: string;
    precio: string;
    minDate: string;
    maxDate: string;
    repetir: string;
  }>({
    idEvento: 0,
    nombreEvento: "",
    descripcion: "",
    precio: "",
    minDate: "",
    maxDate: "",
    repetir: "NO"
  });
  const [disponibilidad, setDisponibilidad] = useState<{
    efec_dia: string;
    efec_hora_inicio: string;
    efec_hora_fin: string
  }[]>([]);

  const [formData, setFormData] = useState({
    evento: 0,
    fecha: "",
    nombre: "",
    apellidos: "",
    edad: "",
    telefono: "",
    email: "",
    foto: "",
  });
  const [locals, setLocals] = useState<Local[]>([]);

  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);  // Tiempo de espera en segundos
  const [eventoFinalizado, setEventoFinalizado] = useState(false);

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

        const res = await fetch(`./api/getEvento?id=${decryptedId}`);
        if (!res.ok) throw new Error("Error al obtener evento");

        const data = await res.json();
        console.log(data);
        setFormData((prev) => ({
          ...prev,
          evento: parseInt(decryptedId),
          fecha: data.rows[0].eve_fecha
        }));
        setDatosEvento({
          idEvento: parseInt(decryptedId),
          nombreEvento: data.rows[0].eve_nombre,
          descripcion: data.rows[0].eve_descripcion || "",
          precio: data.rows[0].eve_precio,
          minDate: data.rows[0].eve_fecha,
          maxDate: data.rows[0].eve_fecha_fin,
          repetir: data.rows[0].eve_repetir,
        });
        setLocals(data.rowsLocals);
        setDisponibilidad(data.rowsDias);

        if (data.rows[0].eve_fecha_fin) {
          const fin = new Date(data.rows[0].eve_fecha_fin);
          if (fin < new Date()) {
            setEventoFinalizado(true);
          }
        }
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [evento]);

  const esHoraPermitida = (fecha: Date) => {
    const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" })
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const minutosTotales = hora * 60 + minutos;

    return disponibilidad.some(({ efec_dia, efec_hora_inicio, efec_hora_fin }) => {
      if (efec_dia !== diaSemana) return false;

      const [hIni, mIni] = efec_hora_inicio.split(":").map(Number);
      const [hFin, mFin] = efec_hora_fin.split(":").map(Number);
      const desde = hIni * 60 + mIni;
      const hasta = hFin * 60 + mFin;

      return minutosTotales >= desde && minutosTotales <= hasta;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (datosEvento.repetir === "SI" && name === "fecha") {
      const fechaSeleccionada = new Date(value);
      const diaSemana = fechaSeleccionada.toLocaleDateString("es-ES", { weekday: "long" })
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
      const hora = fechaSeleccionada.toTimeString().slice(0, 5); // "HH:MM"

      const diaValido = disponibilidad.find(
        (d) =>
          d.efec_dia === diaSemana &&
          hora >= d.efec_hora_inicio.slice(0, 5) &&
          hora <= d.efec_hora_fin.slice(0, 5)
      );

      if (!diaValido) {
        setStatus(
          `La fecha/hora seleccionada no está permitida. Días válidos: ${disponibilidad
            .map((d) => `${d.efec_dia} (${d.efec_hora_inicio} - ${d.efec_hora_fin})`)
            .join(", ")}`
        );
        return;
      }
    }

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
        const value = formData[key as keyof typeof formData];
        if (value !== null && value !== undefined) {
          formPayload.append(key, value.toString());
        }
      }

      // Añadir archivo
      if (eventImage) {
        formPayload.append("foto", eventImage);
      }

      const res = await fetch('./api/saveFormulario', {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) throw new Error("Error al enviar el formulario");
      const dataF = await res.json();

      setStatus("Formulario enviado correctamente. Recibirás respuesta en breve.");
      setCooldown(30);

      setStatus("Redirigiendo a Stripe...");

      try {
        const res = await fetch('./api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            idInscripcion: dataF.idRegistro,
            costoEvento: datosEvento.precio,
            nombreEvento: datosEvento.nombreEvento,
          }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No se pudo obtener la URL de Stripe');
        }
      } catch (err) {
        setStatus("Error al redirigir a Stripe.");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }

      (e.target as HTMLFormElement).reset();
      setFormData({
        evento: datosEvento.idEvento || 0,
        fecha: datosEvento.minDate || "",
        nombre: "",
        apellidos: "",
        edad: "",
        telefono: "",
        email: "",
        foto: "",
      });
      setEventImage(null);
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
          <div className="container mx-auto px-4 z-10 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-anton mb-6">
              FORMULARIO DE COMPRA
            </h1>
          </div>
        </div>

        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-10">
              {/* DESCRIPCIÓN DEL EVENTO */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-anton text-[#3B82F6]">
                  {datosEvento.nombreEvento} {!eventoFinalizado && ` ( ${datosEvento.precio} € )`}
                </h2>
                <p className="text-md text-gray-700 leading-relaxed whitespace-pre-line">
                  {datosEvento.descripcion
                    .replace(/\\n/g, "\n")
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
                {locals.map((local) => (
                  <p key={local.scbl_id} className="text-lg font-anton text-gray-800">
                    &#x1F4CD; Local: {local.scbl_nombre} ({local.scbl_direccion})
                  </p>
                ))}
              </div>

              {!eventoFinalizado ? ( /* FORMULARIO */
                <div className="md:w-1/2">
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto space-y-6"
                  >
                    <input type="hidden" name="evento" value={formData.evento} />
                    <input
                      type="hidden"
                      name="costoEvento"
                      value={datosEvento.precio}
                    />
                    <input
                      type="hidden"
                      name="nombreEvento"
                      value={datosEvento.nombreEvento}
                    />

                    {datosEvento.repetir === "SI" ? (
                      <div>
                        <label htmlFor="fecha" className="block text-lg font-anton text-gray-700">
                          Fecha
                        </label>
                        <DatePicker
                          selected={
                            formData.fecha
                              ? new Date(formData.fecha)
                              : (() => {
                                if (!datosEvento.minDate || disponibilidad.length === 0) return null;

                                const baseDate = new Date(datosEvento.minDate);
                                const [hora, minutos] = disponibilidad[0].efec_hora_inicio.split(":").map(Number);

                                baseDate.setHours(hora);
                                baseDate.setMinutes(minutos);
                                baseDate.setSeconds(0);
                                baseDate.setMilliseconds(0);

                                return baseDate;
                              })()
                          }
                          onChange={(date: Date | null) => {
                            if (!date) return;

                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, "0");
                            const day = String(date.getDate()).padStart(2, "0");
                            const hours = String(date.getHours()).padStart(2, "0");
                            const minutes = String(date.getMinutes()).padStart(2, "0");

                            const localDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;

                            setFormData((prev) => ({ ...prev, fecha: localDatetime }));
                            setStatus("");
                          }}
                          locale="es"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="Pp"
                          minDate={datosEvento.minDate ? new Date(datosEvento.minDate) : undefined}
                          maxDate={datosEvento.maxDate ? new Date(datosEvento.maxDate) : undefined}
                          filterDate={(date) => {
                            const dia = date.toLocaleDateString("es-ES", { weekday: "long" })
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                              .toUpperCase();
                            return disponibilidad.some((d) => d.efec_dia === dia);
                          }}
                          filterTime={(time) => esHoraPermitida(time)}
                          placeholderText="Selecciona fecha y hora"
                          name="fecha"
                          id="fecha"
                          className="mt-1 block w-full px-4 py-3 border border-[#60A5FA] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-[#60A5FA] font-anton"
                        />
                      </div>
                    ) : (
                      <input
                        type="hidden"
                        name="fecha"
                        value={
                          formData.fecha
                            ? new Date(formData.fecha).toLocaleString("es-ES", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : new Date(datosEvento.minDate).toLocaleString("es-ES", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                        }
                      />
                    )}

                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-lg font-anton text-gray-700"
                      >
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
                      <label
                        htmlFor="apellidos"
                        className="block text-lg font-anton text-gray-700"
                      >
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
                      <label
                        htmlFor="edad"
                        className="block text-lg font-anton text-gray-700"
                      >
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
                      <label
                        htmlFor="telefono"
                        className="block text-lg font-anton text-gray-700"
                      >
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
                      <label
                        htmlFor="email"
                        className="block text-lg font-anton text-gray-700"
                      >
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
                      <label
                        htmlFor="foto"
                        className="block text-lg font-anton text-gray-700"
                      >
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
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-[#60A5FA] text-white font-anton font-semibold rounded-md shadow-lg transition duration-300 hover:bg-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                        disabled={isSubmitting || cooldown > 0}
                      >
                        {cooldown > 0 ? `Espere ${cooldown} segundos` : "Enviar"}
                      </button>
                    </div>

                    {status && (
                      <p className="text-center font-anton text-lg text-[#3B82F6] mt-4">
                        {status}
                      </p>
                    )}
                  </form>
                </div>
              ) : (
                <div className="md:w-1/2 flex items-center justify-center h-full">
                  <p className="text-lg font-anton text-red-500">
                    Aqui se mostraran las imagenes del evento, cuando ya ha finalizado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
