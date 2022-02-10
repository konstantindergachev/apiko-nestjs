import { MigrationInterface, QueryRunner } from 'typeorm';
import { orders } from '@app/mock-data/orders';

export class SeedDb1633613527697 implements MigrationInterface {
  name = 'SeedDb1633613527697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query =
      'INSERT INTO "orders" (total, created_at, updated_at, owner_id, shipment) VALUES ';

    for (let i = 0; i < orders.length; i++) {
      if (i === orders.length - 1) {
        query += `(
           ${orders[i].total},
          '${orders[i].created_at}',
          '${orders[i].updated_at}',
           ${orders[i].owner_id},
           ${orders[i].shipment}
        )`;
        await queryRunner.query(query);
      }
      query += `(
           ${orders[i].total},
          '${orders[i].created_at}',
          '${orders[i].updated_at}',
           ${orders[i].owner_id},
           ${orders[i].shipment}
        ), `;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
