import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="bg-[#22272E] min-h-screen">
      <HeroSection />
      <AboutSection />
      <div className="container px-4 py-24">
        <h2 className="text-3xl font-bold text-[#ADBAC7] mb-8 font-mono">Projects</h2>
        <ProjectsGrid />
      </div>
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
