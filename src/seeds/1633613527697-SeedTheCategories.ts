import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1633613527697 implements MigrationInterface {
  name = 'SeedDb1633613527697';

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

  public async down(): Promise<void> {}
}
