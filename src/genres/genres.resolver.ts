import { GenresService } from './genres.service';
import { Injectable } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Genre } from './genre.model';

@Resolver('Genre')
@Injectable()
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query((returns) => [Genre])
  getListGenres(): Promise<Genre[]> {
    return this.genresService.getListGenres();
  }
}
