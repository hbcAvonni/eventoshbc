"use client";
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";

interface Local {
    scbl_id: number;
    scbl_nombre: string;
    scbl_direccion: string;
}

interface Option {
    value: number;
    label: string;
}

type DaySchedule = {
    day: string;
    start: string;
    end: string;
};

export default function CrearEventoPage() {
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
    const [recurringSchedule, setRecurringSchedule] = useState<DaySchedule[]>([]);
    const [localOptions, setLocalOptions] = useState<Option[]>([]);
    const [selectedLocales, setSelectedLocales] = useState<Option[]>([]);
    const [eventMessage, setEventMessage] = useState("");
    const [loadingEvent, setLoadingEvent] = useState(false);

    useEffect(() => {
        const fetchLocals = async () => {
            const res = await fetch("/api/getLocals");
            const data = await res.json();
            const options = data.rows.map((local: Local) => ({
                value: local.scbl_id,
                label: `${local.scbl_nombre} (${local.scbl_direccion})`,
            }));
            setLocalOptions(options);
        };

        fetchLocals();
    }, []);

    const crearEvento = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingEvent(true);
        setEventMessage("");

        try {
            const stored = localStorage.getItem("tokenData");
            const token = stored ? JSON.parse(stored).token : "";
            const formData = new FormData();
            if (eventImage) formData.append("image", eventImage);
            formData.append("name", eventName);
            formData.append("price", parseFloat(eventPrice).toString());
            if (maxPeople) formData.append("maxPeople", maxPeople);
            formData.append("shortDescription", shortDescription);
            formData.append("longDescription", longDescription);
            formData.append("startDateTime", startDateTime);
            formData.append("isRecurring", isRecurring);
            if (isRecurring === "SI") {
                formData.append("endDateTime", endDateTime);
                formData.append("recurringSchedule", JSON.stringify(recurringSchedule));
            }
            formData.append(
                "locales",
                JSON.stringify(selectedLocales.map((loc) => loc.value))
            );

            const res = await fetch("/api/crearEvento", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            setEventMessage(data.message);

            if (res.ok && fileInputRef.current) fileInputRef.current.value = "";
        } catch {
            setEventMessage("Error al crear el evento");
        } finally {
            setLoadingEvent(false);
        }
    };

    return (
        <form onSubmit={crearEvento} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Crear Evento</h2>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => e.target.files && setEventImage(e.target.files[0])} className="w-full" />
            <input type="text" placeholder="Nombre del Evento" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border p-2 rounded" />
            <input type="text" placeholder="Precio del Evento" value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} className="w-full border p-2 rounded" />
            <input type="number" placeholder="Cantidad de personas" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} className="w-full border p-2 rounded" />
            <input type="text" placeholder="Descripción corta" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full border p-2 rounded" />
            <textarea placeholder="Descripción larga" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={4} className="w-full border p-2 rounded"></textarea>
            <label className="block font-semibold">Fecha y hora de inicio</label>
            <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} className="w-full border p-2 rounded" />
            <label className="block font-semibold">¿Evento recurrente?</label>
            <select value={isRecurring} onChange={(e) => setIsRecurring(e.target.value)} className="w-full border p-2 rounded">
                <option value="NO">NO</option>
                <option value="SI">SI</option>
            </select>
            {isRecurring === "SI" && (
                <>
                    <label className="block font-semibold">Fecha y hora de fin</label>
                    <input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} className="w-full border p-2 rounded" />
                </>
            )}
            <label className="block font-semibold mb-2">Locales del evento</label>
            <Select isMulti options={localOptions} value={selectedLocales} onChange={(selected) => setSelectedLocales(selected as Option[])} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4" disabled={loadingEvent}>
                {loadingEvent ? "Creando Evento..." : "Crear Evento"}
            </button>
            {eventMessage && <p className="text-green-700 mt-2">{eventMessage}</p>}
        </form>
    );
}