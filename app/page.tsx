import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import AchievementsSection from "@/components/sections/AchievementsSection";  

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <AchievementsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}