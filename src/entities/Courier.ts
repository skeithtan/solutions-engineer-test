import { Entity } from "typeorm";

@Entity()
export class Courier {
  id: number;
  maxCapacity: number;

  constructor(id: number, maxCapacity: number) {
    this.id = id;
    this.maxCapacity = maxCapacity;
  }
}
