import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1633613527696 implements MigrationInterface {
  name = 'SeedDb1633613527696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "products"
       (title, picture, description, favorite, createdAt, updatedAt, categoryId, price) VALUES
       ('Black one', 'https://domain.com', 'Description the balck one', , '2022-02-08 13:42:42.688573', '2022-02-08 13:42:42.688573' 1, 175.19),
       ('Black two', 'https://domain.com', 'Description the balck two', , '2022-02-08 13:52:43.013602', '2022-02-08 13:52:43.013602' 1, 185.30),
       ('Gray one',  'https://domain.com', 'Description the gray one', , '2022-02-08 13:53:31.204826', '2022-02-08 13:53:31.204826' 1, 384.10),
       ('Black three', 'https://domain.com', 'Description the balck three', 1, '2022-02-08 13:54:19.38195', '2022-02-08 13:54:19.38195' 3, 263.08),
       ('Pink one', 'https://domain.com', 'Description the pink one', , '2022-02-08 13:55:05.526585', '2022-02-08 13:55:05.526585' 4, 302.09),
       ('Black four', 'https://domain.com', 'Description the balck four', , '2022-02-08 13:56:02.45327', '2022-02-08 13:56:02.45327' 4, 190.67),
       ('Black five', 'https://domain.com', 'Description the balck five', , '2022-02-08 13:57:48.273112', '2022-02-08 13:57:48.273112' 3, 115.02),
       ('White one', 'https://domain.com', 'Description the white one', 1, '2022-02-08 13:52:01.534566', '2022-02-08 13:52:01.534566' 2, 212.54),
       ('Black six', 'https://domain.com', 'Description the balck six', , '2022-02-08 13:59:23.649851', '2022-02-08 13:59:23.649851' 2, 277.22),
       ('White two',                      , 'Description the white two', 1, '2022-02-08 13:58:32.214288', '2022-02-08 13:58:32.214288' 3, 155.84),
       ('White three', 'https://domain.com', 'Description the white three', , '2022-02-08 14:00:08.549262', '2022-02-08 14:00:08.549262' 3, 219.43),
       ('White four', 'https://domain.com', 'Description the white four', , '2022-02-08 14:00:52.893678', '2022-02-08 14:00:52.893678' 3, 346.25)
      `,
    );
  }

  public async down(): Promise<void> {}
}
