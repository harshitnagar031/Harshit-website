import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50" id="about">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            About Me
          </h2>
          <Card className="backdrop-blur-sm bg-white/90 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300">
            <CardContent className="p-8">
              <div className="space-y-6">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  I'm a full-stack developer with expertise in building modern web applications. My journey in tech has equipped me with a strong foundation in:
                </motion.p>

                <motion.ul 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700"
                >
                  {[
                    "Modern Frontend Frameworks",
                    "Backend Development",
                    "Database Design",
                    "API Development",
                    "UI/UX Design",
                    "Cloud Services"
                  ].map((skill, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  When I'm not coding, I'm contributing to open-source projects and exploring new technologies to stay at the forefront of web development.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}