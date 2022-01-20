import winston, { Logger } from "winston";

function initializeLogger(): Logger {
  const {
    NODE_ENV,
    LOGGER_LEVEL,
    LOGGER_ERROR_LOG_FILENAME,
    LOGGER_COMBINED_LOG_FILENAME
  } = process.env;

  const transports = [];

  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  if (NODE_ENV !== "production") {
    transports.push(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

  if (LOGGER_ERROR_LOG_FILENAME) {
    // - Write all logs with importance level of `info` or less to `combined.log`
    const transport = new winston.transports.File({ filename: LOGGER_ERROR_LOG_FILENAME, level: "error" });
    transports.push(transport);
  }

  if (LOGGER_COMBINED_LOG_FILENAME) {
    // - Write all logs with importance level of `info` or less to `combined.log`
    const transport = new winston.transports.File({ filename: LOGGER_COMBINED_LOG_FILENAME });
    transports.push(transport);
  }

  return winston.createLogger({
    level: LOGGER_LEVEL,
    format: winston.format.json(),
    transports
  });
}

export const logger = initializeLogger();