import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAccountAndUserEntities1644249009925 implements MigrationInterface {
    name = 'ChangeAccountAndUserEntities1644249009925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_3aa23c0a6d107393e8b40e3e2a6" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "userId"`);
    }

}
