import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RosterSection from "@/components/RosterSection";
import EventsSection from "@/components/EventsSection";
import ParthersSection from "@/components/ParthersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <RosterSection />
      <EventsSection />
      <ParthersSection />
      <Footer />
    </main>
  );
}
