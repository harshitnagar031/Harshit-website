import type { Project } from "@shared/schema";

export async function fetchGitHubProjects(): Promise<Project[]> {
  const res = await fetch('/api/github/pull-requests');
  if (!res.ok) {
    throw new Error('Failed to fetch pull requests');
  }
  return res.json();
}