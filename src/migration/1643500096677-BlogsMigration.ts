import {MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey} from "typeorm";

export class BlogsMigration1643500096677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "blogs",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "slug",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "image",
                    type: "varchar",
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

        await queryRunner.createForeignKey("blogs", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createIndex("blogs", new TableIndex({
            name: "IDX_SLUG",
            columnNames: ["slug"],
            isUnique:true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("blogs", "IDX_SLUG");
        await queryRunner.dropTable("blogs");
    }

}
