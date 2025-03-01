import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Redis"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "GitHub Actions"] }
];

export function SkillsSection() {
  return (
    <section className="py-24 bg-[#22272E]" id="skills">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#ADBAC7] mb-8 font-mono">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillSet, index) => (
              <Card key={index} className="bg-[#2D333B] border-none">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#ADBAC7] mb-4 font-mono">
                    {skillSet.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillSet.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[#347D39] text-white hover:bg-[#46954A] transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}