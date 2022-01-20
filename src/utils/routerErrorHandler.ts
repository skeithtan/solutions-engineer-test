import Koa from "koa";
import { StatusCodes } from "http-status-codes";

/**
 * A middleware that absorbs unhandled errors and sets the response to internal server error.
 * @param ctx
 * @param next
 */
export async function routerErrorHandler(ctx: Koa.Context, next: Koa.Next) {
  try {
    await next();
  } catch (error) {
    // The default status is not found. If unchanged,
    // set to internal server error. Otherwise, keep overridden value.
    if (ctx.status === StatusCodes.NOT_FOUND) {
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    const message = error instanceof Error ? error.message : `An unknown error occurred.`;
    ctx.body = { message };
  }
}