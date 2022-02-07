import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAccountAndUser1644260360013 implements MigrationInterface {
    name = 'CreateAccountAndUser1644260360013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "accountId" integer, CONSTRAINT "REL_42bba679e348de51a699fb0a80" UNIQUE ("accountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "country" character varying, "city" character varying, "address" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "REL_3aa23c0a6d107393e8b40e3e2a" UNIQUE ("userId"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
