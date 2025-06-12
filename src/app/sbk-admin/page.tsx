"use client";
import React, { useEffect, useRef, useState } from "react";

interface Local {
  scbl_id: number;
  scbl_nombre: string;
  scbl_direccion: string;
}

export default function SbkAdminPage(): JSX.Element {
  const getStoredToken = (): string => {
    const stored = localStorage.getItem("tokenData");
    if (!stored) return "";

    const parsed = JSON.parse(stored);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("tokenData");
      return "";
    }

    return parsed.token;
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(getStoredToken());
  const [status, setStatus] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const [eventImage, setEventImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [eventName, setEventName] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [isRecurring, setIsRecurring] = useState("NO");
  const [endDateTime, setEndDateTime] = useState("");
  type DaySchedule = {
    day: string;
    start: string;
    end: string;
  };
  const [recurringSchedule, setRecurringSchedule] = useState<DaySchedule[]>([]);
  const [locals, setLocals] = useState<Local[]>([]);
  const [local, setLocal] = useState("");

  const [eventMessage, setEventMessage] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const res = await fetch('./api/getLocals');
        if (!res.ok) throw new Error("Error al obtener los locales");
        const data = await res.json();
        setLocals(data.rows);
      } catch (error: unknown) {
        setStatus("error");
        setLoginMessage(error instanceof Error ? error.message : "No se pudieron cargar los locales");
      }
    };

    fetchLocals();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const res = await fetch('./api/generate-jwt', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const tokenData = {
          token: data.token,
          expiresAt: Date.now() + 60 * 60 * 1000
        };
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
        setToken(data.token);
        setStatus("ok");
        setLoginMessage("");
      } else {
        setStatus("error");
        setLoginMessage(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      setStatus("error");
      setLoginMessage("Error de red");
    } finally {
      setLoadingLogin(false);
    }
  };

  const enviarNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingNewsletter(true);
    setNewsletterMessage("");
    try {
      const res = await fetch('./api/sendNewsletter', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, message: content }),
      });
      const data = await res.json();
      setNewsletterMessage(data.message);
    } catch (error) {
      setNewsletterMessage("Error al enviar newsletter");
    } finally {
      setLoadingNewsletter(false);
    }
  };

  const resetFormularioEvento = () => {
    setEventImage(null);
    setEventName("");
    setEventPrice("");
    setMaxPeople("");
    setShortDescription("");
    setLongDescription("");
    setStartDateTime("");
    setIsRecurring("NO");
    setEndDateTime("");
    setRecurringSchedule([]);
    setLocal("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const crearEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEvent(true);
    setEventMessage("");

    try {
      const formData = new FormData();
      if (eventImage) {
        formData.append("image", eventImage);
      }
      formData.append("name", eventName);
      formData.append("price", parseFloat(eventPrice).toString());
      if (maxPeople) {
        formData.append("maxPeople", maxPeople);
      }
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("startDateTime", startDateTime);
      formData.append("isRecurring", isRecurring);
      if (isRecurring === "SI") {
        formData.append("endDateTime", endDateTime);
        formData.append("recurringSchedule", JSON.stringify(recurringSchedule));
      }
      if (local) {
        formData.append("local", local);
      }

      const res = await fetch('./api/crearEvento', {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setEventMessage(data.message);

      if (res.ok) {
        resetFormularioEvento(); // ✅ limpia el formulario
      }
    } catch (error) {
      setEventMessage("Error al crear el evento");
    } finally {
      setLoadingEvent(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-20 p-6">
      {!token ? (
        <form onSubmit={login} className="space-y-4 max-w-md mx-auto p-6 border rounded shadow-md">
          <h1 className="text-2xl font-bold">Panel SBK Admin</h1>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {loadingLogin ? "Entrando..." : "Entrar"}
          </button>
          {status === "error" && (
            <p className="text-red-600">{loginMessage}</p>
          )}
        </form>
      ) : (
        <div className="flex space-x-8">
          {/* Sección de Enviar Newsletter a la izquierda */}
          <div className="w-1/2 p-6 border rounded shadow-md">
            <form onSubmit={enviarNewsletter} className="space-y-4">
              <h2 className="text-xl font-semibold">Enviar Newsletter</h2>
              <input
                type="text"
                placeholder="Asunto del correo"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Contenido del mensaje"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full border p-2 rounded"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {loadingNewsletter ? "Enviando..." : "Enviar Newsletter"}
              </button>
              {newsletterMessage && (
                <p className="text-green-700">{newsletterMessage}</p>
              )}
            </form>
          </div>

          {/* Sección de Crear Evento a la derecha */}
          <div className="w-1/2 p-6 border rounded shadow-md">
            <form onSubmit={crearEvento} className="space-y-4">
              <h2 className="text-xl font-semibold">Crear Evento</h2>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEventImage(e.target.files[0]);
                  }
                }}
                name="image"
                className="w-full"
              />

              <input
                type="text"
                placeholder="Nombre del Evento"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Precio del Evento"
                value={eventPrice}
                onChange={(e) => setEventPrice(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                placeholder="Cantidad de personas"
                value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Descripción corta"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <textarea
                placeholder="Descripción larga"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={4}
                className="w-full border p-2 rounded"
              ></textarea>

              <label className="block font-semibold">Fecha y hora de inicio</label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <label className="block font-semibold">¿Evento recurrente?</label>
              <select
                value={isRecurring}
                onChange={(e) => setIsRecurring(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="NO">NO</option>
                <option value="SI">SI</option>
              </select>

              {isRecurring === "SI" && (
                <>
                  <label className="block font-semibold">Fecha y hora de fin</label>
                  <input
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    className="w-full border p-2 rounded"
                  />

                  <div className="space-y-4 mt-4">
                    <label className="block font-semibold">¿Qué días de la semana se repite y en qué horario?</label>
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => {
                      const current = recurringSchedule.find((d) => d.day === day);
                      const isChecked = !!current;

                      return (
                        <div key={day} className="border p-2 rounded">
                          <label className="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setRecurringSchedule([...recurringSchedule, { day, start: "", end: "" }]);
                                } else {
                                  setRecurringSchedule(recurringSchedule.filter((d) => d.day !== day));
                                }
                              }}
                            />
                            <span className="font-semibold">{day}</span>
                          </label>

                          {isChecked && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm block">Hora de inicio</label>
                                <input
                                  type="time"
                                  value={current?.start || ""}
                                  onChange={(e) => {
                                    setRecurringSchedule((prev) =>
                                      prev.map((d) =>
                                        d.day === day ? { ...d, start: e.target.value } : d
                                      )
                                    );
                                  }}
                                  className="w-full border p-2 rounded"
                                />
                              </div>
                              <div>
                                <label className="text-sm block">Hora de fin</label>
                                <input
                                  type="time"
                                  value={current?.end || ""}
                                  onChange={(e) => {
                                    setRecurringSchedule((prev) =>
                                      prev.map((d) =>
                                        d.day === day ? { ...d, end: e.target.value } : d
                                      )
                                    );
                                  }}
                                  className="w-full border p-2 rounded"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <label className="block font-semibold">Local del evento</label>
              <select
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Seleccione un local</option>
                {locals.map((local) => (
                  <option key={local.scbl_id} value={local.scbl_id}>
                    {local.scbl_nombre} ({local.scbl_direccion})
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                disabled={loadingEvent}
              >
                {loadingEvent ? "Creando Evento..." : "Crear Evento"}
              </button>

              {eventMessage && <p className="text-green-700">{eventMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
