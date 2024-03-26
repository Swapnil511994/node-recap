import express from "express";
import bodyParser from "body-parser";
import registerRoutes from "./routes.js";
import { config } from "./config.js";

import amqp from "amqplib/callback_api.js";
import logger from "./logger.js";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

registerRoutes(app);
app.listen(config.ApplicationConfig.port, () => {
  try {
    amqp.connect("amqp://localhost", (err, conn) => {
      if (err) {
        throw err;
      }
      conn.createChannel((channelCreationError, channel) => {
        if (channelCreationError) throw channelCreationError;
        const queue = "helloWorldQueue";
        const message = "Hello World";
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", message);
      });
    });
  } catch (error) {
    logger.error(
      "Unable to initialize rabbit mq: " + error?.message
        ? error.message
        : "Unknown Error"
    );
  }
  console.log(`Server Started 🚀 at Port: ${config.ApplicationConfig.port}`);
});
