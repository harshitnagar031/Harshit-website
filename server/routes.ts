import type { Express } from "express";
import { createServer } from "http";

const GITHUB_USERNAME = "harshitnagar22"; 

export async function registerRoutes(app: Express) {
  app.get("/api/github/projects", async (req, res) => {
    try {
      // Search for all pull requests by the user
      const response = await fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&sort=created&order=desc`);

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const data = await response.json();

      const projects = data.items.map((pr: any) => ({
        name: pr.title,
        description: pr.body || "No description provided",
        url: pr.html_url,
        repository: pr.repository_url.split('/').slice(-1)[0],
        created_at: new Date(pr.created_at).toLocaleDateString(),
        state: pr.state,
        merged: pr.pull_request?.merged_at ? true : false
      }));

      res.json(projects);
    } catch (error) {
      console.error('Error fetching GitHub pull requests:', error);
      res.status(500).json({ error: "Failed to fetch GitHub pull requests" });
    }
  });

  app.get("/api/github/pull-requests", async (req, res) => {
    try {
      const headers = process.env.GITHUB_TOKEN ? {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      } : {};

      // Search for pull requests by the user
      const response = await fetch(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&sort=created&order=desc`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const data = await response.json();

      // Transform the data to match our frontend needs
      const pullRequests = data.items.map((pr: any) => ({
        id: pr.id,
        title: pr.title,
        url: pr.html_url,
        repository: pr.repository_url.split('/').slice(-2)[0],
        createdAt: pr.created_at,
        status: pr.state,
        merged: pr.pull_request?.merged_at ? true : false
      }));

      console.log('Fetched pull requests:', pullRequests);
      res.json(pullRequests);
    } catch (error) {
      console.error('Error fetching GitHub pull requests:', error);
      res.status(500).json({ error: "Failed to fetch GitHub pull requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}