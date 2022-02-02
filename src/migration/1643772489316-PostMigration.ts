import {MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey} from "typeorm";

export class PostMigration1643772489316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "posts",
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

        await queryRunner.createIndex("posts", new TableIndex({
            name: "IDX_SLUG",
            columnNames: ["slug"],
            isUnique:true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("posts", "IDX_SLUG");
        await queryRunner.dropTable("posts");
    }

}
