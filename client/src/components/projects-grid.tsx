import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Star, GitBranch, Eye } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectsGrid() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({ 
    queryKey: ['/api/github/projects']
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-black/20 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader className="p-6">
              <Skeleton className="h-8 w-3/4 bg-white/5" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Skeleton className="h-24 w-full bg-white/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load projects</div>;
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects?.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="bg-black/20 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group h-full">
            <CardHeader className="p-6">
              <h3 className="text-2xl font-semibold font-mono text-white group-hover:text-indigo-400 transition-colors">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  {project.name}
                </a>
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-gray-400 mb-8 font-mono text-lg">{project.description}</p>
              <div className="flex gap-6 items-center mb-6">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="w-5 h-5" />
                  <span className="text-base">{project.stars}</span>
                </div>
                {project.language && (
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-base px-4 py-1">
                    {project.language}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="outline" 
                    className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20 transition-colors text-base"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}