"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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

export default function EditarEventoPage() {
    const searchParams = useSearchParams();
    const eventId = searchParams?.get("id");

    const [eventImage, setEventImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
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

    const formatDateForInput = (fecha: string) => {
        const date = new Date(fecha);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16);
    };

    useEffect(() => {
        const fetchAll = async () => {
            const [resLocals, resEvento] = await Promise.all([
                fetch("/api/getLocals"),
                fetch(`/api/getEvento?id=${eventId}`)
            ]);
            const dataLocals = await resLocals.json();
            const dataEvento = await resEvento.json();

            // Set options
            const localOpts = dataLocals.rows.map((local: Local) => ({
                value: local.scbl_id,
                label: `${local.scbl_nombre} (${local.scbl_direccion})`,
            }));
            setLocalOptions(localOpts);

            const evento = dataEvento.rows[0];
            const locals = dataEvento.rowsLocals || [];
            const dias = dataEvento.rowsDias || [];

            setImageUrl(evento.eve_imagen || null);
            setEventName(evento.eve_nombre);
            setEventPrice(evento.eve_precio);
            setMaxPeople(evento.eve_cupos);
            setShortDescription(evento.eve_detalles);
            setLongDescription(evento.eve_descripcion);
            setStartDateTime(formatDateForInput(evento.eve_fecha));
            setIsRecurring(evento.eve_repetir);

            if (evento.eve_repetir === "SI") {
                setEndDateTime(formatDateForInput(evento.eve_fecha_fin));
                const diasFormateados = dias.map((d: any) => ({
                    day: d.efec_dia,
                    start: d.efec_hora_inicio,
                    end: d.efec_hora_fin
                }));
                setRecurringSchedule(diasFormateados);
            }

            const selected = locals.map((loc: any) => ({
                value: loc.scbl_id,
                label: `${loc.scbl_nombre} (${loc.scbl_direccion})`
            }));

            // Asegurar que los valores existan en las opciones
            const matched = selected.filter((sel: Option) =>
                localOpts.find((opt: Option) => opt.value === sel.value)
            );
            setSelectedLocales(matched);
        };

        if (eventId) fetchAll();
    }, [eventId]);

    const editarEvento = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingEvent(true);
        setEventMessage("");

        try {
            const stored = localStorage.getItem("tokenData");
            const token = stored ? JSON.parse(stored).token : "";
            const formData = new FormData();
            formData.append("id", eventId || "");
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
            formData.append("locales", JSON.stringify(selectedLocales.map((loc) => loc.value)));

            const res = await fetch(`/api/editarEvento?id=${eventId}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            setEventMessage(data.message);
        } catch {
            setEventMessage("Error al editar el evento");
        } finally {
            setLoadingEvent(false);
        }
    };

    return (
        <form onSubmit={editarEvento} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Editar Evento</h2>
            {imageUrl && (
                <div className="mb-2">
                    <img src={imageUrl} alt="Imagen del evento" className="w-full max-w-32 rounded shadow-md" />
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setEventImage(file);
                        const preview = URL.createObjectURL(file);
                        setImageUrl(preview);
                    }
                }}
                className="w-full"
            />
            <input type="text" placeholder="Nombre del Evento" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border p-2 rounded" />
            <input type="text" placeholder="Precio del Evento" value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} className="w-full border p-2 rounded" />
            <input type="text" placeholder="Cantidad de personas" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} className="w-full border p-2 rounded" />
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

                    <div className="space-y-4 mt-4">
                        <label className="block font-semibold">¿Qué días de la semana se repite y en qué horario?</label>
                        {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((day) => {
                            const normalizarDia = (dia: string) =>
                                dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                            const current = recurringSchedule.find((d) =>
                                normalizarDia(d.day) === normalizarDia(day)
                            );
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
                                                                normalizarDia(d.day) === normalizarDia(day)
                                                                    ? { ...d, start: e.target.value }
                                                                    : d
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
                                                                normalizarDia(d.day) === normalizarDia(day)
                                                                    ? { ...d, end: e.target.value }
                                                                    : d
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
            <label className="block font-semibold mb-2">Locales del evento</label>
            <Select isMulti options={localOptions} value={selectedLocales} onChange={(selected) => setSelectedLocales(selected as Option[])} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4" disabled={loadingEvent}>
                {loadingEvent ? "Guardando cambios..." : "Guardar Cambios"}
            </button>
            {eventMessage && <p className="text-green-700 mt-2">{eventMessage}</p>}
        </form>
    );
}