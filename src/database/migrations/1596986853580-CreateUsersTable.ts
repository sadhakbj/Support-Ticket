import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedDeletedAt1596986853580 implements MigrationInterface {
  name = 'AddedDeletedAt1596986853580'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" uuid, "updatedBy" uuid, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying DEFAULT null, CONSTRAINT "UQ_8852f85982c3947febf76e36810" UNIQUE ("username"), CONSTRAINT "PK_c88cc8077366b470dafc2917366" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth_users"`)
  }
}
