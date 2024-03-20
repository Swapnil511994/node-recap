import { Sequelize } from "sequelize";
import { config } from "./config.js";
import { initiateModels } from "./models.loader.js";

class DatabaseSingleton {
  constructor() {
    throw new Error("Use getInstance() method");
  }

  static async getInstance() {
    if (!this.instance) {
      try {
        this.instance = new Sequelize(
          config.Mysql.database,
          config.Mysql.username,
          config.Mysql.password || "",
          {
            host: config.Mysql.host,
            port: config.Mysql.port,
            database: config.Mysql.database,
            dialect: "mysql",
            logging: console.log,
          }
        );
        await this.instance.authenticate();
        initiateModels(this.instance);
      } catch (error) {
        throw new Error("Failed to connect to the database: " + error.message);
      }
    }
    return this.instance;
  }
}

const db = await DatabaseSingleton.getInstance();
export default db;
