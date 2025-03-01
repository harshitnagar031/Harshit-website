import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // Add a debug query to check if the API is working
  const { data: debugPullRequests, error: debugError } = useQuery({
    queryKey: ['/api/github/pull-requests'],
    onSuccess: (data) => console.log('Pull requests data:', data),
    onError: (error) => console.error('Pull requests error:', error)
  });

  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <AboutSection />
      <div className="container px-4 py-24 bg-[#22272E]">
        <h2 className="text-3xl font-bold text-[#ADBAC7] mb-8 font-mono">
          Open Source Contributions
        </h2>
        <ProjectsGrid />
      </div>
      <SkillsSection />
    </div>
  );
}