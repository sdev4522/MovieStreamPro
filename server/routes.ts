import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMovieSchema, insertCategorySchema, insertUserSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express) {
  // Session middleware
  app.use(
    session({
      store: new SessionStore({ checkPeriod: 86400000 }),
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    const result = insertUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await storage.getUserByUsername(result.data.username);
    if (!user || user.password !== result.data.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user.id;
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req: any, res) => {
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
  });

  // Movies routes
  app.get("/api/movies", async (req, res) => {
    const movies = await storage.getMovies();
    res.json(movies);
  });

  app.get("/api/movies/:id", async (req, res) => {
    const movie = await storage.getMovie(parseInt(req.params.id));
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  });

  app.post("/api/movies", requireAdmin, async (req, res) => {
    const result = insertMovieSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const movie = await storage.createMovie(result.data);
    res.json(movie);
  });

  app.patch("/api/movies/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const result = insertMovieSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const movie = await storage.updateMovie(id, result.data);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  });

  app.delete("/api/movies/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteMovie(id);
    if (!success) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/categories/:id/movies", async (req, res) => {
    const movies = await storage.getMoviesByCategory(parseInt(req.params.id));
    res.json(movies);
  });

  const httpServer = createServer(app);
  return httpServer;
}