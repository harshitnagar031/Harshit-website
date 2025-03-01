import type { Project } from "@shared/schema";

export async function fetchGitHubProjects(): Promise<Project[]> {
  const res = await fetch("/api/github/projects");
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}
