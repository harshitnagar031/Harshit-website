import type { Express } from "express";
import { createServer } from "http";

const GITHUB_USERNAME = "octocat"; // Using GitHub's demo account as default

export async function registerRoutes(app: Express) {
  app.get("/api/github/projects", async (req, res) => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`);

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const data = await response.json();

      const projects = data.map((repo: any) => ({
        name: repo.name,
        description: repo.description || "",
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || []
      }));

      res.json(projects);
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      res.status(500).json({ error: "Failed to fetch GitHub projects" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}