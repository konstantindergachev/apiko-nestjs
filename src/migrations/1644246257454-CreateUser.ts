import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1644246257454 implements MigrationInterface {
    name = 'CreateUser1644246257454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "accountId" integer, CONSTRAINT "REL_42bba679e348de51a699fb0a80" UNIQUE ("accountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
