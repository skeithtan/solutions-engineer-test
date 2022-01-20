import Joi, { ValidationError } from "joi";
import Koa from "koa";
import { StatusCodes } from "http-status-codes";

/**
 * A middleware that validates the request body, ensuring that it conforms to the provided schema.
 * @param schema - The Joi Schema that the request body must conform to.
 */
export function validateSchema(schema: Joi.Schema): Koa.Middleware {
  return async (ctx, next) => {
    const { error } = schema.validate(ctx.request.body);

    if (!(error instanceof ValidationError)) {
      await next();
      return;
    }

    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = {
      message: "A validation error has occurred",
      details: error.details
    };
  };
}
