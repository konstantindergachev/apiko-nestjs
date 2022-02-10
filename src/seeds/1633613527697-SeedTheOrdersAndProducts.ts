import { MigrationInterface, QueryRunner } from 'typeorm';
import { ordersProducts } from '@app/mock-data/orders-products';

export class SeedDb1633613527697 implements MigrationInterface {
  name = 'SeedDb1633613527697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query =
      'INSERT INTO "orders_products" (orders_id, products_id) VALUES ';

    for (let i = 0; i < ordersProducts.length; i++) {
      if (i === ordersProducts.length - 1) {
        query += `(
           ${ordersProducts[i].orders_id},
           ${ordersProducts[i].products_id}
        )`;
        await queryRunner.query(query);
      }
      query += `(
           ${ordersProducts[i].orders_id},
           ${ordersProducts[i].products_id}
        ), `;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
