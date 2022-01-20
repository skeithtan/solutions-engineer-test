import { createConnection, getConnection } from "typeorm";

/**
 * A set of database functions for the testing suite
 */

export async function close() {
  await getConnection().close();
}

export async function create() {
  await createConnection();
}

export async function clear() {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  }
}