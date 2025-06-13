"use client";
import React, { useState, useEffect } from "react";

export default function NewsletterPage() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("tokenData");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Date.now() < parsed.expiresAt) {
                setToken(parsed.token);
            }
        }
    }, []);

    const enviarNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/sendNewsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ subject, message: content }),
            });
            const data = await res.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Error al enviar newsletter");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={enviarNewsletter}
            className="max-w-xl mx-auto mt-20 space-y-4 p-6 border rounded shadow-md"
        >
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
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Enviando..." : "Enviar Newsletter"}
            </button>
            {message && <p className="text-green-700">{message}</p>}
        </form>
    );
}