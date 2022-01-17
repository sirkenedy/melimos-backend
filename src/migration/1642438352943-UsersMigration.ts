import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class UsersMigration1642438352943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
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
                    isNullable : false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable : false,
                },
                {
                    name: "email_verified_at",
                    type: "boolean",
                    default: null ,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable : false,
                },
                {
                    name: "image",
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

        await queryRunner.createIndex("users", new TableIndex({
            name: "IDX_EMAIL",
            columnNames: ["email"],
            isUnique:true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "IDX_EMAIL");
        await queryRunner.dropTable("users");
    }

}
