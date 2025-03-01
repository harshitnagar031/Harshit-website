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

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Here you would typically integrate with an email service
      // For now, we'll just log the message and return success
      console.log('Contact form submission:', { name, email, message });

      res.json({ success: true, message: "Message received successfully" });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ error: "Failed to process contact form submission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}