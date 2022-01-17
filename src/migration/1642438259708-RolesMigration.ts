import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class RolesMigration1642438259708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
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

        await queryRunner.createIndex("roles", new TableIndex({
            name: "IDX_NAME",
            columnNames: ["name"],
            isUnique:true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "IDX_NAME");
        await queryRunner.dropTable("roles");
    }

}
