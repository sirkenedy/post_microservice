import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './components/categories/categories.module';
import { PostsModule } from './components/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({}), CategoriesModule, PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
