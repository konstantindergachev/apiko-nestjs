import { MigrationInterface, QueryRunner } from 'typeorm';
import { countries } from '@app/mock-data/countries';

export class SeedDb1633613527699 implements MigrationInterface {
  name = 'SeedDb1633613527699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query = 'INSERT INTO "countries" (name) VALUES ';

    for (let i = 0; i < countries.length; i++) {
      if (i === countries.length - 1) {
        query += `(
           '${countries[i].name}'
        )`;
        await queryRunner.query(query);
      }
      query += `(
           '${countries[i].name}'
        ), `;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
