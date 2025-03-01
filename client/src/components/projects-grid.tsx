import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectsGrid() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({ 
    queryKey: ['/api/github/projects']
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-[#2D333B] border-none">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-[#444C56]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full bg-[#444C56]" />
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
          <Card className="bg-[#2D333B] border-none hover:bg-[#373E47] transition-colors">
            <CardHeader>
              <h3 className="text-xl font-semibold font-mono text-[#ADBAC7]">
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                   className="hover:text-blue-400">
                  {project.name}
                </a>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-[#768390] mb-4 font-mono">{project.description}</p>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-[#768390]">{project.stars}</span>
                </div>
                {project.language && (
                  <Badge variant="secondary" className="bg-[#347D39] text-white">
                    {project.language}
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-blue-400 border-blue-800">
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