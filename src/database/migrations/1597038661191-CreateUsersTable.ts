import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'
import { DBTable } from './../../constants/dbtable'

export class CreateUsersTable1597038661191 implements MigrationInterface {
  name = 'CreateUsersTable1597038661191'

  /**
   * Run the migration.
   * @param queryRunner
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTable.AUTH_USERS,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'date',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'date',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'createdBy',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updatedBy',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'deletedBy',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    )

    const createdByForeignKey = new TableForeignKey({
      columnNames: ['createdBy'],
      referencedColumnNames: ['id'],
      referencedTableName: DBTable.AUTH_USERS,
      onDelete: 'CASCADE',
    })

    const updatedByForeignKey = new TableForeignKey({
      columnNames: ['updatedBy'],
      referencedColumnNames: ['id'],
      referencedTableName: DBTable.AUTH_USERS,
      onDelete: 'CASCADE',
    })

    const deletedByForeignKey = new TableForeignKey({
      columnNames: ['deletedBy'],
      referencedColumnNames: ['id'],
      referencedTableName: DBTable.AUTH_USERS,
      onDelete: 'CASCADE',
    })

    await queryRunner.createForeignKey(DBTable.AUTH_USERS, createdByForeignKey)
    await queryRunner.createForeignKey(DBTable.AUTH_USERS, updatedByForeignKey)
    await queryRunner.createForeignKey(DBTable.AUTH_USERS, deletedByForeignKey)
  }

  /**
   * Revert the migration.
   * @param queryRunner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DBTable.AUTH_USERS)
  }
}
