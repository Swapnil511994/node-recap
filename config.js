import dotenv from "dotenv";
dotenv.config();

export const config = {
  Mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
  ApplicationConfig: {
    port: parseInt(process.env.APP_PORT) || 3000,
  },
};
