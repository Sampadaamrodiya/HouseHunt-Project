import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import fs from "fs";
import authRoutes from "./server/routes/userRoutes.js";
import ownerRoutes from "./server/routes/ownerRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";
import propertyRoutes from "./server/routes/propertyRoutes.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Ensure uploads directory exists
  if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
  }

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/owner", ownerRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/properties", propertyRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
