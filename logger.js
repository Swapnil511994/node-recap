import winston from "winston";
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      maxFiles: "14d",
      maxSize: "20m",
      datePattern: "YYYY-MM-DD",
    }),
  ],
});

export default logger;
