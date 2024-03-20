import express from "express";

import registerRoutes from "./routes.js";
import { config } from "./config.js";

const app = express();

registerRoutes(app);
app.listen(config.ApplicationConfig.port, () => {
  console.log(`Server Started 🚀 at Port: ${config.ApplicationConfig.port}`);
});
