import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-mono">
            &lt;h2&gt;About Me&lt;/h2&gt;
          </h2>
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6 font-mono">
                &lt;p&gt;
                I'm a full-stack developer with expertise in:
                &lt;ul&gt;
                  &lt;li&gt;HTML5, CSS3, JavaScript&lt;/li&gt;
                  &lt;li&gt;React and Modern Web Frameworks&lt;/li&gt;
                  &lt;li&gt;Responsive Design&lt;/li&gt;
                &lt;/ul&gt;
                &lt;/p&gt;
              </p>
              <p className="text-gray-700 leading-relaxed font-mono">
                &lt;p&gt;
                When I'm not coding, I contribute to open-source projects and explore new web technologies.
                &lt;/p&gt;
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}