// NOTE: Load environmental variables -- must come first
import "dotenv/config";
import { logger } from "./utils/logger";
import Koa from "koa";

function handleApplicationError(error: Error) {
  logger.error(`Server error: `, error);
}

function main() {
  const { SERVER_PORT } = process.env;
  logger.info("Starting server...");

  const app = new Koa();
  app.listen(SERVER_PORT);
  app.on("error", handleApplicationError);

  logger.info(`Server is listening on port ${SERVER_PORT}`);
}

main();