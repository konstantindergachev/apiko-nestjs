import { MigrationInterface, QueryRunner } from 'typeorm';
import { products } from '@app/mock-data/products';

export class SeedDb1633613527696 implements MigrationInterface {
  name = 'SeedDb1633613527696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query =
      'INSERT INTO "products" (title, price, picture, description, favorite, created_at, updated_at, category_id) VALUES ';

    const prods = products;
    for (let i = 0; i < prods.length; i++) {
      if (i === prods.length - 1) {
        query += `(
          '${prods[i].title}',
           ${prods[i].price},
          '${prods[i].picture}',
          '${prods[i].description}',
           ${!!prods[i].favorite},
          '${prods[i].created_at}',
          '${prods[i].updated_at}',
           ${prods[i].category_id}
        )`;
        await queryRunner.query(query);
      }
      query += `(
          '${prods[i].title}',
           ${prods[i].price},
          '${prods[i].picture}',
          '${prods[i].description}',
           ${!!prods[i].favorite},
          '${prods[i].created_at}',
          '${prods[i].updated_at}',
           ${prods[i].category_id}
        ), `;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
