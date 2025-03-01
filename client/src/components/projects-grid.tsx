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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-black/20 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-white/5" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full bg-white/5" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="bg-black/20 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <CardHeader>
              <h3 className="text-xl font-semibold font-mono text-white group-hover:text-indigo-400 transition-colors">
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
            <CardContent>
              <p className="text-gray-400 mb-6 font-mono">{project.description}</p>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{project.stars}</span>
                </div>
                {project.language && (
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                    {project.language}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="outline" 
                    className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20 transition-colors"
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