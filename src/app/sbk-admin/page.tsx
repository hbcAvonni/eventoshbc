"use client";
import React, { useState } from "react";

export default function SbkAdminPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [loginMessage, setLoginMessage] = useState("");  

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");  

  const [eventName, setEventName] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventMessage, setEventMessage] = useState("");  

  const [loadingLogin, setLoadingLogin] = useState(false); 
  const [loadingNewsletter, setLoadingNewsletter] = useState(false); 
  const [loadingEvent, setLoadingEvent] = useState(false); 

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

  const crearEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEvent(true);
    setEventMessage(""); 
    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("price", parseFloat(eventPrice).toString());
    formData.append("endDate", eventEndDate);
    if (eventImage) {
      formData.append("image", eventImage);
    }

    try {
      const res = await fetch('./api/crearEvento', {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setEventMessage(data.message);
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
                type="date"
                placeholder="Fecha de Finalización"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEventImage(e.target.files[0]); 
                  }
                }}
                name="image"
                className="w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                disabled={loadingEvent} 
              >
                {loadingEvent ? "Creando Evento..." : "Crear Evento"}
              </button>
              {eventMessage && (
                <p className="text-green-700">{eventMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
