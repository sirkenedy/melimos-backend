import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class ContactsMigration1642942095774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contacts",
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
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "subject",
                    type: "varchar",
                },
                {
                    name: "message",
                    type: "varchar",
                },
                {
                    name: "status",
                    type: "boolean",
                    default: 0
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

        await queryRunner.createIndex("contacts", new TableIndex({
            name: "IDX_SUBJECT",
            columnNames: ["subject"],
        }));

        await queryRunner.createIndex("contacts", new TableIndex({
            name: "FULL_IDX_MESSAGE",
            columnNames: ["message"],
            isFulltext:true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("contacts", "FULL_IDX_MESSAGE");
        await queryRunner.dropIndex("contacts", "IDX_SUBJECT");
        await queryRunner.dropTable("contacts");
    }

}
