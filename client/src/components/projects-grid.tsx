import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GitPullRequest } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsGrid() {
  const { data: pullRequests, isLoading, error } = useQuery({
    queryKey: ['/api/github/pull-requests'],
    onError: (error) => {
      console.error('Failed to fetch pull requests:', error);
    },
    onSuccess: (data) => {
      console.log('Successfully fetched pull requests:', data);
    }
  });

  console.log('ProjectsGrid render:', { pullRequests, isLoading, error });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-[#2D333B] border-none">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-5 h-5 bg-[#444C56] rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 bg-[#444C56] mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-[#444C56]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Error details:', error);
    return (
      <div className="text-red-500 p-4 bg-[#2D333B] rounded-lg">
        Failed to load pull requests. Please try again later.
        {error instanceof Error && <p className="text-sm mt-2">{error.message}</p>}
      </div>
    );
  }

  if (!pullRequests || pullRequests.length === 0) {
    return (
      <div className="text-[#ADBAC7] p-4 bg-[#2D333B] rounded-lg">
        No pull requests found for this GitHub account.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pullRequests.map((pr: any, i: number) => (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#2D333B] border-none hover:bg-[#373E47] transition-colors duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GitPullRequest className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ADBAC7] hover:text-blue-400 font-medium transition-colors line-clamp-2"
                    >
                      {pr.title}
                    </a>
                    <p className="text-sm text-[#768390] mt-1">
                      {pr.repository} • {new Date(pr.createdAt).toLocaleDateString()}
                    </p>
                    {pr.status && (
                      <p className={`text-sm mt-2 ${
                        pr.status === 'open' ? 'text-green-400' : 
                        pr.status === 'closed' ? 'text-red-400' : 
                        'text-yellow-400'
                      }`}>
                        Status: {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}