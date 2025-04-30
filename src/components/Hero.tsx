"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url(./assets/images/concierto.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-4 z-10 py-20 md:pt-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-3xl md:text-5xl font-anton mb-6 sbk-shadow">
            Toda nuestra pasión entregada a la magia efímera de un concierto
          </h1>

          <div className="mt-12 mb-20">
            <div className="text-center">
              <h2 className="text-6xl md:text-8xl font-anton sbk-shadow sbk-blue">
                SBK<br/>SOCIAL
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
