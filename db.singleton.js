import { Sequelize } from "sequelize";
import { config } from "./config.js";
import { initiateModels } from "./models.loader.js";

class DatabaseSingleton {
  constructor() {
    throw new Error("Use getInstance() method");
  }

  static getInstance() {
    if (!this.instance) {
      const sequelize = new Sequelize(
        config.Mysql.host,
        config.Mysql.username,
        config.Mysql.password,
        { port: config.Mysql.port, dialect: "mysql" }
      );

      initiateModels(sequelize);

      this.instance = sequelize;
    }
    return this.instance;
  }
}

const db = DatabaseSingleton.getInstance();
export default db;
