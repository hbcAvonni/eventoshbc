import SidebarMenu from '@/components/sbk-admin/SidebarMenu';
import '../globals.css';

export const metadata = {
    title: 'Panel de administración - SBK',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="flex min-h-screen bg-gray-100">
                <SidebarMenu />
                <main className="flex-1 p-6">{children}</main>
            </body>
        </html>
    );
}