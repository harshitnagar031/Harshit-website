import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "../client")));

// Log API requests
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
        }
    });

    next();
});

(async () => {
    const server = await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
    });

    // Serve index.html for all routes (SPA fallback)
    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../client/index.html"));
    });

    // Start the server
    const port = 5000;
    server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
    }, () => {
        console.log(`Server running on port ${port}`);
    });
})();