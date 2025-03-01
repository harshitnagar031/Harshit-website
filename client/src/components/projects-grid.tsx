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
          <Card key={i} className="bg-white border border-gray-200">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Failed to load projects</div>;
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
          <Card className="bg-white hover:bg-gray-50 transition-colors border border-gray-200">
            <CardHeader>
              <h3 className="text-xl font-semibold font-mono text-gray-900">
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                   className="hover:text-blue-600">
                  {project.name}
                </a>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 font-mono">{project.description}</p>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">{project.stars}</span>
                </div>
                {project.language && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {project.language}
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-blue-600 border-blue-200">
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