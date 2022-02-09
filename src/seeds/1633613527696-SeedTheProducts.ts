import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1633613527696 implements MigrationInterface {
  name = 'SeedDb1633613527696';

  products = [
    {
      title: 'Black one',
      price: 175.19,
      picture: 'https://domain.com',
      description: 'Description the balck one',
      favorite: 0,
      created_at: '2022-02-08 13:42:42.688573',
      updated_at: '2022-02-08 13:42:42.688573',
      category_id: 1,
    },
    {
      title: 'Black two',
      price: 185.3,
      picture: 'https://domain.com',
      description: 'Description the balck two',
      favorite: 0,
      created_at: '2022-02-08 13:52:43.013602',
      updated_at: '2022-02-08 13:52:43.013602',
      category_id: 1,
    },
    {
      title: 'Gray one',
      price: 384.1,
      picture: 'https://domain.com',
      description: 'Description the gray one',
      favorite: 0,
      created_at: '2022-02-08 13:53:31.204826',
      updated_at: '2022-02-08 13:53:31.204826',
      category_id: 1,
    },
    {
      title: 'Black three',
      price: 263.08,
      picture: 'https://domain.com',
      description: 'Description the black three',
      favorite: 1,
      created_at: '2022-02-08 13:54:19.38195',
      updated_at: '2022-02-08 13:54:19.38195',
      category_id: 3,
    },
    {
      title: 'Pink one',
      price: 302.09,
      picture: 'https://domain.com',
      description: 'Description the pink one',
      favorite: 0,
      created_at: '2022-02-08 13:54:19.38195',
      updated_at: '2022-02-08 13:54:19.38195',
      category_id: 4,
    },
    {
      title: 'Black four',
      price: 190.67,
      picture: 'https://domain.com',
      description: 'Description the black five',
      favorite: 0,
      created_at: '2022-02-08 13:56:02.45327',
      updated_at: '2022-02-08 13:56:02.45327',
      category_id: 4,
    },
    {
      title: 'Black five',
      price: 115.02,
      picture: 'https://domain.com',
      description: 'Description the black five',
      favorite: 0,
      created_at: '2022-02-08 13:57:48.273112',
      updated_at: '2022-02-08 13:57:48.273112',
      category_id: 3,
    },
    {
      title: 'White one',
      price: 212.54,
      picture: 'https://domain.com',
      description: 'Description the white one',
      favorite: 1,
      created_at: '2022-02-08 13:52:01.534566',
      updated_at: '2022-02-08 13:52:01.534566',
      category_id: 2,
    },
    {
      title: 'Black six',
      price: 277.22,
      picture: 'https://domain.com',
      description: 'Description the black six',
      favorite: 0,
      created_at: '2022-02-08 13:59:23.649851',
      updated_at: '2022-02-08 13:59:23.649851',
      category_id: 2,
    },
    {
      title: 'White two',
      price: 155.84,
      picture: '',
      description: 'Description the white two',
      favorite: 1,
      created_at: '2022-02-08 13:58:32.214288',
      updated_at: '2022-02-08 13:58:32.214288',
      category_id: 3,
    },
    {
      title: 'White three',
      price: 219.43,
      picture: 'https://domain.com',
      description: 'Description the white three',
      favorite: 0,
      created_at: '2022-02-08 14:00:08.549262',
      updated_at: '2022-02-08 14:00:08.549262',
      category_id: 3,
    },
    {
      title: 'White four',
      price: 346.25,
      picture: 'https://domain.com',
      description: 'Description the white four',
      favorite: 0,
      created_at: '2022-02-08 14:00:52.893678',
      updated_at: '2022-02-08 14:00:52.893678',
      category_id: 3,
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query =
      'INSERT INTO "products" (title, price, picture, description, favorite, created_at, updated_at, category_id) VALUES ';

    const prods = this.products;
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

  public async down(): Promise<void> {}
}
