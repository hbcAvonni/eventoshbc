'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const SidebarMenu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const hideSidebar = pathname === '/sbk-admin';

    if (hideSidebar) return null;

    const handleLogout = () => {
        localStorage.removeItem('tokenData');
        router.push('/sbk-admin');
    };

    return (
        // <aside className="w-64 bg-white border-r p-6 space-y-6 shadow-md h-full flex flex-col justify-between">
        <aside className="w-64 bg-white border-r p-6 space-y-4 shadow-md justify-between">
            <div>
                <h2 className="text-xl font-bold mb-4">SBK Admin</h2>
                <nav className="flex flex-col space-y-2">
                    <Link href="/sbk-admin/dashboard" className="hover:text-blue-600">
                        Dashboard
                    </Link>
                    <Link href="/sbk-admin/dashboard/eventos" className="hover:text-blue-600">
                        Eventos
                    </Link>
                    <Link href="/sbk-admin/dashboard/newsletter" className="hover:text-blue-600">
                        Newsletter
                    </Link>
                </nav>
            </div>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
                Cerrar sesión
            </button>
        </aside>
    );
};

export default SidebarMenu;