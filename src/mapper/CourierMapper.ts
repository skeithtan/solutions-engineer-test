import { Mapper } from "./mapper";
import { Courier } from "../entities/Courier";
import { CourierDTO } from "../dto/courier";

export const CourierMapper: Mapper<CourierDTO, Courier> = class {
  static toDTO(entity: Courier): CourierDTO {
    return {
      id: entity.id,
      max_capacity: entity.maxCapacity
    };
  }

  static toEntity(dto: CourierDTO): Courier {
    const courier = new Courier();
    courier.id = dto.id;
    courier.maxCapacity = dto.max_capacity
    return courier;
  }
}