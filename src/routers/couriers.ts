import Router from "@koa/router";
import { StatusCodes } from "http-status-codes";
import { Courier } from "../entities/Courier";
import { validateSchema } from "../utils/validateSchema";
import { CourierMapper } from "../mapper/CourierMapper";
import { MoreThanOrEqual } from "typeorm";
import { courierSchema } from "../dto/courier";

export const couriersRouter = new Router({
  prefix: "/couriers"
});

// region - Couriers CRUD
couriersRouter.post("/", validateSchema(courierSchema), async (ctx) => {
  const courier = CourierMapper.toEntity(ctx.request.body);

  const existingIdCount = await Courier.count({ where: { id: courier.id } });

  if (existingIdCount > 0) {
    ctx.status = StatusCodes.BAD_REQUEST;
    throw new Error(`Courier with ID ${courier.id} already exists.`);
  }

  await courier.save();
  ctx.status = StatusCodes.CREATED;
  ctx.body = CourierMapper.toDTO(courier);
});

couriersRouter.put("/:courierId", validateSchema(courierSchema), async (ctx) => {
  const { courierId } = ctx.params;

  if (courierId == null) {
    ctx.status = StatusCodes.BAD_REQUEST;
    throw new Error("Courier ID required to perform modifications.");
  }

  const courier = await Courier.findOne(courierId);

  if (!courier) {
    ctx.status = StatusCodes.NOT_FOUND;
    throw new Error(`Could not find courier with ID "${courierId}."`);
  }

  courier.maxCapacity = ctx.request.body.max_capacity;
  await courier.save();

  ctx.status = StatusCodes.OK;
  ctx.body = CourierMapper.toDTO(courier);
});

couriersRouter.delete("/:courierId", async (ctx) => {
  const { courierId } = ctx.params;

  if (courierId == null) {
    ctx.status = StatusCodes.BAD_REQUEST;
    throw new Error("Courier ID required to perform deletion.");
  }

  const courier = await Courier.findOne(courierId);

  if (!courier) {
    ctx.status = StatusCodes.NOT_FOUND;
    throw new Error(`Could not find courier with ID "${courierId}."`);
  }

  await courier.remove();
  ctx.status = StatusCodes.OK;
});
// endregion

// region - Lookup
couriersRouter.get("/lookup", async (ctx) => {
  const capacityRequired = ctx.query.capacity_required ?? 0;
  const couriers = await Courier.find({ where: { maxCapacity: MoreThanOrEqual(capacityRequired) } });
  ctx.status = StatusCodes.OK;
  ctx.body = couriers;
});
// endregion