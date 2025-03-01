import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { GitPullRequest, Calendar } from "lucide-react";
import type { Project } from "@shared/schema";
import { format } from "date-fns";

export function ProjectsGrid() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({ 
    queryKey: ['/api/github/pull-requests']
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    return <div className="text-red-500">Failed to load pull requests</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects?.map((pr, i) => (
        <motion.div
          key={pr.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="bg-[#2D333B] border-none hover:bg-[#373E47] transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold font-mono text-[#ADBAC7]">
                  <a href={pr.url} target="_blank" rel="noopener noreferrer"
                     className="hover:text-blue-400">
                    {pr.title || pr.name}
                  </a>
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#768390] mt-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(pr.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[#768390] mb-4 font-mono">{pr.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {pr.repository && (
                  <Badge variant="secondary" className="bg-[#347D39] text-white">
                    {pr.repository}
                  </Badge>
                )}
                {pr.topics?.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-blue-400 border-blue-800">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {projects?.length === 0 && (
        <div className="col-span-2 text-center text-[#768390]">
          No pull requests found
        </div>
      )}
    </div>
  );
}