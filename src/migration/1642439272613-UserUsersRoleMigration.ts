import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class UserUsersRoleMigration1642439272613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "role_user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "roleId",
                    type: "int",
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        await queryRunner.createIndex("role_user", new TableIndex({
            name: "IDX_FOREIGN_ID",
            columnNames: ["roleId", "userId"],
            isUnique: true,
        }));
        
        await queryRunner.createForeignKey("role_user", new TableForeignKey({
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("role_user", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("role_user");
        const roleForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("roleId") !== -1);
        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("role_user", roleForeignKey);
        await queryRunner.dropForeignKey("role_user", userForeignKey);
        await queryRunner.dropIndex("role_user", "IDX_FOREIGN_ID");
        await queryRunner.dropTable("role_user");
    }

}
