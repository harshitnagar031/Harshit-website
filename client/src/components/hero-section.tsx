import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0F172A] py-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0F172A] animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <motion.h1 
              className="text-5xl lg:text-8xl font-bold text-white mb-8 font-mono tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-white">Hello, I'm </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Harshit Nagar
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              A passionate full-stack developer crafting exceptional digital experiences
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-6 justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 backdrop-blur-sm border-2 border-indigo-500/20 hover:border-indigo-500/40 hover:bg-white/10 transition-all duration-300 text-lg px-8 py-6"
              onClick={() => window.open('https://github.com/harshitnagar22', '_blank')}
            >
              <FaGithub className="mr-3 h-6 w-6" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 backdrop-blur-sm border-2 border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 text-lg px-8 py-6"
              onClick={() => window.open('https://www.linkedin.com/in/harshit-nagar-708a27290', '_blank')}
            >
              <FaLinkedin className="mr-3 h-6 w-6" />
              LinkedIn
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-24"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-8 h-8 mx-auto text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}