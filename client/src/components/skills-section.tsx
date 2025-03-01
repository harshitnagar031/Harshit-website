import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  { 
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    color: "from-blue-500/20 to-cyan-500/20" 
  },
  { 
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Redis"],
    color: "from-green-500/20 to-emerald-500/20"
  },
  { 
    category: "Tools",
    items: ["Git", "Docker", "AWS", "GitHub Actions"],
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export function SkillsSection() {
  return (
    <section className="py-32 bg-[#0F172A]" id="skills">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 font-mono relative text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Skills
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillSet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`
                  bg-gradient-to-br ${skillSet.color} 
                  backdrop-blur-xl border-white/10 
                  hover:border-white/20 transition-all duration-300
                  overflow-hidden relative h-full
                `}>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                  <CardContent className="p-8 relative">
                    <h3 className="text-2xl font-semibold text-white mb-6 font-mono">
                      {skillSet.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skillSet.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="
                            bg-white/5 text-white border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300
                            text-base px-4 py-1
                          "
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}