export interface Mapper<DataTransferObject, Entity> {
  toDTO(entity: Entity): DataTransferObject;
  toEntity(dto: DataTransferObject): Entity;
}