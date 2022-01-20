import request from "supertest";
import { app } from "../../index";
import * as connection from "../../utils/connection";
import { CourierDTO } from "../../dto/courier";

const TEST_COURIER_20 = { "id": 21, "max_capacity": 20 };
const TEST_COURIER_30 = { "id": 22, "max_capacity": 30 };
const TEST_COURIER_40 = { "id": 23, "max_capacity": 40 };
const TEST_COURIER_50 = { "id": 24, "max_capacity": 50 };
const TEST_COURIER_60 = { "id": 25, "max_capacity": 60 };
const TEST_COURIERS = [TEST_COURIER_20, TEST_COURIER_30, TEST_COURIER_40, TEST_COURIER_50, TEST_COURIER_60];
const TEST_NEW_CAPACITY = 75;

async function postCourier(courier: CourierDTO) {
  await request(app.callback())
    .post("/couriers")
    .send(courier)
    .expect(201);
}

describe("Courier REST APIs", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  test("POST /couriers", async () => {
    await Promise.all(TEST_COURIERS.map(postCourier));
  });

  test("PUT /couriers", async () => {
    const response = await request(app.callback())
      .put(`/couriers/${TEST_COURIER_20.id}`)
      .send({ ...TEST_COURIER_20, max_capacity: TEST_NEW_CAPACITY })
      .expect(200);

    expect(response.body.max_capacity).toEqual(TEST_NEW_CAPACITY);
  });

  test("DELETE /couriers", async () => {
    await request(app.callback())
      .delete(`/couriers/${TEST_COURIER_20.id}`)
      .expect(200);

    const response = await request(app.callback())
      .get("/couriers/lookup")
      .query({ capacity_required: 75 })
      .expect(200);

    expect(response.body.length).toEqual(0);
  });

  test("GET /couriers/lookup above 40", async () => {
    const response = await request(app.callback())
      .get("/couriers/lookup")
      .query({ capacity_required: 40 })
      .expect(200);

    const result = response.body;
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(3);
    expect(result.find((it: CourierDTO) => it.id === TEST_COURIER_40.id)).toBeDefined();
    expect(result.find((it: CourierDTO) => it.id === TEST_COURIER_50.id)).toBeDefined();
    expect(result.find((it: CourierDTO) => it.id === TEST_COURIER_60.id)).toBeDefined();
  });
});