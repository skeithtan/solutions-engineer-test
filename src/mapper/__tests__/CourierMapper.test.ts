import { Courier } from "../../entities/Courier";
import { CourierDTO } from "../../dto/courier";
import { CourierMapper } from "../CourierMapper";

const TEST_COURIER_ID = 1234;
const TEST_COURIER_CAPACITY = 40;

function createCourierEntity(): Courier {
  const courier = new Courier();
  courier.id = TEST_COURIER_ID;
  courier.maxCapacity = TEST_COURIER_CAPACITY;
  return courier;
}

const testEntity = createCourierEntity();
const testDto: CourierDTO = {
  id: TEST_COURIER_ID,
  max_capacity: TEST_COURIER_CAPACITY
};

describe("CourierMapper", () => {
  test("transform to DTO", () => {
    const dto = CourierMapper.toDTO(testEntity);
    expect(dto.id).toEqual(testEntity.id);
    expect(dto.max_capacity).toEqual(testEntity.maxCapacity);
  });

  test("transform to Entity", () => {
    const entity = CourierMapper.toEntity(testDto);
    expect(entity).toBeInstanceOf(Courier);
    expect(entity.id).toEqual(testDto.id);
    expect(entity.maxCapacity).toEqual(testDto.max_capacity);
  })
});