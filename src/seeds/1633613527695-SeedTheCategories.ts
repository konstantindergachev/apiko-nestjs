import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1633613527695 implements MigrationInterface {
  name = 'SeedDb1633613527695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "categories"
       (name) VALUES
       ('eiusmod et'),
       ('cillum nostrud'),
       ('esse ipsum'),
       ('esse irure'),
       ('cupidatat nostrud'),
       ('sint excepteur')
      `,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
