import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: true,
      }),
    }),
    MoviesModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
