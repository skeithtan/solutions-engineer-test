import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Courier extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  maxCapacity: number;
}
