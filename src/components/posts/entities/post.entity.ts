import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { Category } from '../../categories/entities/category.entity'

@Entity({name: "posts"})
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    slug: string;
  
    @Column()
    description: string;
  
    @CreateDateColumn()
    created_at:  Date;

    @UpdateDateColumn()
    updated_at:  Date;

    @ManyToMany(() => Category, category => category.posts, {
      eager: true,
      cascade: true,
    })
    @JoinTable({
      name: "blog_category",
      joinColumn: {
        name: "blogId",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
          name: "CategoryId",
          referencedColumnName: "id"
      }
    })
    categories: Category[];

    @BeforeInsert()
      @BeforeUpdate()
        addSlug() {
          this.slug = (this.title).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }
}
