import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrderEntity1644485923754 implements MigrationInterface {
    name = 'CreateOrderEntity1644485923754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer, "shipment" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("ordersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_5a93a693981ce4cc916058acbb0" PRIMARY KEY ("ordersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb3c8f28e12941555634002ab5" ON "items" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4013b1d959e37ce27803cd6a3b" ON "items" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5e3453db50ea9de6f0e4bfec10" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8912424ee459943132901c73afd" FOREIGN KEY ("shipment") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_cb3c8f28e12941555634002ab51" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4013b1d959e37ce27803cd6a3bb" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4013b1d959e37ce27803cd6a3bb"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_cb3c8f28e12941555634002ab51"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8912424ee459943132901c73afd"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5e3453db50ea9de6f0e4bfec10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4013b1d959e37ce27803cd6a3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb3c8f28e12941555634002ab5"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
