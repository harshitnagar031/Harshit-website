import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#22272E]">
      <div className="container px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#ADBAC7] mb-6 font-mono">
            Hello, I'm <span className="text-[#539BF5]">Your Name</span>
          </h1>
          <p className="text-xl text-[#ADBAC7] mb-8 max-w-2xl mx-auto">
            A passionate full-stack developer building amazing web experiences
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-[#2D333B] text-[#ADBAC7] hover:bg-[#373e47]"
              onClick={() => window.open('https://github.com/yourusername', '_blank')}
            >
              <FaGithub className="mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-[#2D333B] text-[#ADBAC7] hover:bg-[#373e47]"
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
