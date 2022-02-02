import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class BlogCategoryMigration1643500200111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "post_category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "postId",
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

        await queryRunner.createIndex("post_category", new TableIndex({
            name: "IDX_FOREIGN_ID",
            columnNames: ["postId", "categoryId"],
            isUnique: true,
        }));
        
        await queryRunner.createForeignKey("post_category", new TableForeignKey({
            columnNames: ["postId"],
            referencedColumnNames: ["id"],
            referencedTableName: "posts",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("post_category", new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("post_category");
        const postForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("postId") !== -1);
        const categoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
        await queryRunner.dropForeignKey("post_category", postForeignKey);
        await queryRunner.dropForeignKey("post_category", categoryForeignKey);
        await queryRunner.dropIndex("post_category", "IDX_FOREIGN_ID");
        await queryRunner.dropTable("post_category");
    }

}
