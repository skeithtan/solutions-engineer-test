// NOTE: Load environmental variables -- must come first
import "dotenv/config";
import { logger } from "./utils/logger";
import * as routers from "./routers";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { routerErrorHandler } from "./utils/routerErrorHandler";
import { createConnection } from "typeorm";

export const app = new Koa();

function handleApplicationError(error: Error) {
  logger.error(`Server error: `, error);
}

async function main() {
  const { SERVER_PORT } = process.env;
  logger.info("Starting server...");

  // Register error handlers
  app.on("error", handleApplicationError);
  app.use(routerErrorHandler);

  // Register body parser
  app.use(bodyParser());

  // Register routers to app
  Object.values(routers).forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  await createConnection();
  app.listen(SERVER_PORT);

  logger.info(`Server is listening on port ${SERVER_PORT}`);
}

main().then();