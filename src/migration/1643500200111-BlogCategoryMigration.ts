import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class BlogCategoryMigration1643500200111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "blog_category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "blogId",
                    type: "int",
                },
                {
                    name: "categoryId",
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

        await queryRunner.createIndex("blog_category", new TableIndex({
            name: "IDX_FOREIGN_ID",
            columnNames: ["blogId", "categoryId"],
            isUnique: true,
        }));
        
        await queryRunner.createForeignKey("blog_category", new TableForeignKey({
            columnNames: ["blogId"],
            referencedColumnNames: ["id"],
            referencedTableName: "blogs",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("blog_category", new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("blog_category");
        const blogForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("blogId") !== -1);
        const categoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
        await queryRunner.dropForeignKey("blog_category", blogForeignKey);
        await queryRunner.dropForeignKey("blog_category", categoryForeignKey);
        await queryRunner.dropIndex("blog_category", "IDX_FOREIGN_ID");
        await queryRunner.dropTable("blog_category");
    }

}
