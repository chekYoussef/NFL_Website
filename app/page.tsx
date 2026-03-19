import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MissionSection } from "@/components/mission-section";
import { KidOfWeekSection } from "@/components/kid-of-week-section";
import { NewsSection } from "@/components/news-section";
import { PillarsSection } from "@/components/pillars-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MissionSection />
      <KidOfWeekSection />
      <NewsSection />
      <PillarsSection />
      <StatsSection />
      <Footer />
    </main>
  );
}
