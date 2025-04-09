import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RosterSection from "@/components/RosterSection";
import EventsSection from "@/components/EventsSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <RosterSection />
      <EventsSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
