import { courierSchema } from "../courier";
import { ValidationError } from "joi";

const VALID_COURIER = { "id": 22, "max_capacity": 30 };
const INVALID_COURIERS = [
  // Empty object
  {},

  // Missing max capacity field
  { "id": 1 },

  // Missing ID field
  { "max_capacity": 50 },

  // Missing max capacity field (camel case)
  { "id": 5, "maxCapacity": 90 },

  // Negative max capacity
  { "id": 60, "max_capacity": -90 },

  // Negative ID
  { "id": -200, "max_capacity": 50 }
];

describe("Courier validation", () => {
  test("should validate valid couriers", () => {
    const { error } = courierSchema.validate(VALID_COURIER);
    expect(error).toBeUndefined();
  });

  test("should invalidate invalid couriers", () => {
    const errors = INVALID_COURIERS.map((it) => courierSchema.validate(it))
      .map(({ error }) => error)
      .filter((error) => error instanceof ValidationError);

    expect(errors.length).toBe(INVALID_COURIERS.length);
  });
});