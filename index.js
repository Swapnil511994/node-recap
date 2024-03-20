import express from "express";
import bodyParser from "body-parser";
import registerRoutes from "./routes.js";
import { config } from "./config.js";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

registerRoutes(app);
app.listen(config.ApplicationConfig.port, () => {
  console.log(`Server Started 🚀 at Port: ${config.ApplicationConfig.port}`);
});
