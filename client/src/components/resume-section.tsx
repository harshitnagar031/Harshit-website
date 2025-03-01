import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";

export function ResumeSection() {
  const handleDownload = () => {
    // The resume file should be in the public directory
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            My Resume
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Download my resume to learn more about my experience, skills, and qualifications.
          </p>
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <FaFileDownload className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
