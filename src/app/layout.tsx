import "./globals.css";
import type { Metadata } from "next";
import { Inter, Anton, Roboto, Raleway, Montserrat } from "next/font/google";
import { ClientBody } from "./ClientBody"; // Fixed import of ClientBody component
import "react-datepicker/dist/react-datepicker.css";
import FloatingButton from '@/components/FloatingButton';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Espectáculos y eventos SBK Social",
  description: "SBK Social - espectáculos con más de 15 años de experiencia y más de 500 eventos exitosamente organizados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${anton.variable} ${roboto.variable} ${raleway.variable} ${montserrat.variable}`}>
        <ClientBody>{children}</ClientBody>
        <FloatingButton />
      </body>
    </html>
  );
}
