import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-24 bg-[#22272E]" id="about">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#ADBAC7] mb-8 font-mono">About Me</h2>
          <Card className="bg-[#2D333B]">
            <CardContent className="p-6">
              <p className="text-[#ADBAC7] leading-relaxed mb-6">
                I'm a full-stack developer with a passion for building beautiful, functional, 
                and user-friendly applications. With several years of experience in web development,
                I specialize in modern JavaScript frameworks and cloud technologies.
              </p>
              <p className="text-[#ADBAC7] leading-relaxed">
                When I'm not coding, you can find me contributing to open-source projects,
                writing technical blog posts, or exploring new technologies.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
