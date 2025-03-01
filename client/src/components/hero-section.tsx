import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="container px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-mono">
            &lt;h1&gt;Hello, I'm <span className="text-blue-600">Your Name</span>&lt;/h1&gt;
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-mono">
            &lt;p&gt;A passionate full-stack developer building amazing web experiences&lt;/p&gt;
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-100 border-gray-200"
              onClick={() => window.open('https://github.com/yourusername', '_blank')}
            >
              <FaGithub className="mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-100 border-gray-200"
              onClick={() => window.open('https://linkedin.com/in/yourusername', '_blank')}
            >
              <FaLinkedin className="mr-2" />
              LinkedIn
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}