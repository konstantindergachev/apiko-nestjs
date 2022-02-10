import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntities1644499437663 implements MigrationInterface {
    name = 'CreateEntities1644499437663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer, "shipment" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" numeric(5,2) NOT NULL DEFAULT '0', "picture" character varying NOT NULL DEFAULT '', "description" character varying, "favorite" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" integer, "user_id" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "country" character varying, "city" character varying, "address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "REL_3000dad1da61b29953f0747632" UNIQUE ("user_id"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products" ("orders_id" integer NOT NULL, "products_id" integer NOT NULL, CONSTRAINT "PK_6ab7369177b16c5d94c324fe5fc" PRIMARY KEY ("orders_id", "products_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_243803da0235b10de9f44ed583" ON "orders_products" ("orders_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f562af3e2f808eb76fa084cb9f" ON "orders_products" ("products_id") `);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f562af3e2f808eb76fa084cb9f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_243803da0235b10de9f44ed583"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
