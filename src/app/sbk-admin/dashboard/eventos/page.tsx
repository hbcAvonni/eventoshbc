'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiEdit, FiTrash2, FiImage } from 'react-icons/fi';

interface Evento {
    eve_id: number;
    eve_nombre: string;
    eve_cupos: string;
    eve_fecha: string;
    eve_fecha_fin: string;
    eve_precio: number;
    eve_lugar: string;
    idEncript: string;
}

export default function EventosPage() {
    const zonaEspaña = 'Europe/Madrid';
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredEventos = eventos.filter(evento =>
        evento.eve_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEventos.length / itemsPerPage);
    const paginatedEventos = filteredEventos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const res = await fetch('/api/getEventos');
                const data = await res.json();
                setEventos(data.rows || []);
            } catch (err) {
                setError("No se pudieron cargar los eventos.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const eliminarEvento = async (id: number) => {
        if (!confirm("¿Seguro que quieres eliminar este evento?")) return;
        try {
            const tokenData = localStorage.getItem('tokenData');
            const token = tokenData ? JSON.parse(tokenData).token : '';

            const res = await fetch(`/api/eliminarEvento?id=${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                setEventos(prev => prev.filter(e => e.eve_id !== id));
            } else {
                alert("Error al eliminar el evento.");
            }
        } catch (err) {
            alert("Error en la solicitud.");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Lista de Eventos</h2>
                <Link
                    href="/sbk-admin/dashboard/eventos/crearEvento"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear Evento
                </Link>
            </div>

            {loading ? (
                <p>Cargando eventos...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Buscar evento..."
                        className="border px-3 py-2 mb-4 rounded w-full md:w-1/3"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reinicia la página cuando cambie la búsqueda
                        }}
                    />
                    <table className="w-full border border-gray-300 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Nombre</th>
                                <th className="p-2 border">Cupos</th>
                                <th className="p-2 border">Precio</th>
                                <th className="p-2 border">Fecha Inicio</th>
                                <th className="p-2 border">Fecha Fin</th>
                                <th className="p-2 border">Estado</th>
                                <th className="p-2 border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEventos.map((evento) => {
                                const ahora = new Date();
                                const fechaInicio = new Date(evento.eve_fecha);
                                const fechaFin = new Date(evento.eve_fecha_fin);

                                let estado = '';
                                let color = '';

                                if (ahora < fechaInicio) {
                                    estado = 'Próximamente';
                                    color = 'text-blue-600';
                                } else if (ahora >= fechaInicio && ahora <= fechaFin) {
                                    estado = 'En curso';
                                    color = 'text-green-600';
                                } else {
                                    estado = 'Finalizado';
                                    color = 'text-red-600';
                                }

                                return (
                                    <tr key={evento.eve_id}>
                                        <td className="p-2 border">{evento.eve_nombre}</td>
                                        <td className="p-2 border">{evento.eve_cupos}</td>
                                        <td className="p-2 border">{evento.eve_precio} €</td>
                                        <td className="p-2 border">
                                            {format(toZonedTime(evento.eve_fecha, zonaEspaña), "EEEE, dd 'de' MMMM 'del' yyyy 'a las' HH:mm", { locale: es })}
                                        </td>
                                        <td className="p-2 border">
                                            {format(toZonedTime(evento.eve_fecha_fin, zonaEspaña), "EEEE, dd 'de' MMMM 'del' yyyy 'a las' HH:mm", { locale: es })}
                                        </td>
                                        <td className={`p-2 border font-semibold ${color}`}>{estado}</td>
                                        <td className="p-2 border space-x-2 flex items-center">
                                            <Link
                                                href={`/sbk-admin/dashboard/eventos/editarEvento?id=${evento.eve_id}`}
                                                className="text-yellow-500 hover:text-yellow-600"
                                                title="Editar evento"
                                            >
                                                <FiEdit size={18} />
                                            </Link>
                                            <button
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => eliminarEvento(evento.eve_id)}
                                                title="Eliminar evento"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                            {fechaInicio <= ahora && (
                                                <Link
                                                    href={`/sbk-admin/dashboard/eventos/galeriaEvento?id=${evento.eve_id}`}
                                                    className="text-blue-500 hover:text-blue-600"
                                                    title="Gestionar galería"
                                                >
                                                    <FiImage size={18} />
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}