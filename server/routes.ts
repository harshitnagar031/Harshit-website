import type { Express } from "express";
import { createServer } from "http";

export async function registerRoutes(app: Express) {
  app.get("/api/github/projects", async (req, res) => {
    try {
      const response = await fetch("https://api.github.com/users/REPLACE_USERNAME/repos?sort=stars&per_page=6");
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
      res.status(500).json({ error: "Failed to fetch GitHub projects" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
