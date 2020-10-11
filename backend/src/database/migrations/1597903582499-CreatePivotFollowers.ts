import { DBTable } from 'src/constants/dbtable'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePivotFollowers1597903582499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTable.PIVOT_USERS_FOLLOWERS,
        columns: [
          {
            name: 'follower_id',
            type: 'uuid',
          },
          {
            name: 'followee_id',
            type: 'uuid',
          },
          {
            name: 'deletedAt',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true,
    )

    const followerIdForeignKey = new TableForeignKey({
      columnNames: ['follower_id'],
      referencedColumnNames: ['id'],
      referencedTableName: DBTable.AUTH_USERS,
      onDelete: 'CASCADE',
    })

    const followeeIdForeignKey = new TableForeignKey({
      columnNames: ['followee_id'],
      referencedColumnNames: ['id'],
      referencedTableName: DBTable.AUTH_USERS,
      onDelete: 'CASCADE',
    })

    await queryRunner.createForeignKey(DBTable.PIVOT_USERS_FOLLOWERS, followerIdForeignKey)
    await queryRunner.createForeignKey(DBTable.PIVOT_USERS_FOLLOWERS, followeeIdForeignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const userTable = await queryRunner.getTable(DBTable.PIVOT_USERS_FOLLOWERS)
    // const followerForeignKey = userTable.foreignKeys.find(fk => fk.columnNames.indexOf('follower_id') !== -1)
    // const followeeForeignKey = userTable.foreignKeys.find(fk => fk.columnNames.indexOf('followee_id') !== -1)

    // await queryRunner.dropForeignKey(DBTable.PIVOT_USERS_FOLLOWERS, followerForeignKey)
    // await queryRunner.dropForeignKey(DBTable.PIVOT_USERS_FOLLOWERS, followeeForeignKey)
    await queryRunner.dropTable(DBTable.PIVOT_USERS_FOLLOWERS)
  }
}
