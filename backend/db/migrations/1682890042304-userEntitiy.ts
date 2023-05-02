import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntitiy1682890042304 implements MigrationInterface {
    name = 'UserEntitiy1682890042304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "password" varchar NOT NULL, "address" varchar NOT NULL, "privateKey" varchar)`);
        await queryRunner.query(`CREATE INDEX "IDX_3122b4b8709577da50e89b6898" ON "user" ("address") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_3122b4b8709577da50e89b6898"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
