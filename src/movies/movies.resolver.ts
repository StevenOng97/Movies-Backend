import { MoviesService } from './movies.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MoviesFilter } from './filter.model';

@Resolver((of) => Movie)
export class MoviesResolver {
  constructor(private moviesService: MoviesService) {}

  @Query((returns) => [Movie])
  getMovies(
    @Args('page', { type: () => Int, nullable: true }) page: number,
  ): Observable<AxiosResponse<Movie[]>> {
    return this.moviesService.getMovies(page);
  }

  @Query((returns) => [Movie])
  getMoviesWithFilters(
    @Args('query', { nullable: true }) query: string,
    @Args('with_genres', { type: () => Int, nullable: true })
    with_genres: number,
    @Args('page', { type: () => Int, nullable: true }) page: number,
  ): Observable<AxiosResponse<Movie[]>> {
    const filters = { query, with_genres, page };
    return this.moviesService.getMoviesWithFilters(filters);
  }

  @Query((returns) => [Movie])
  getMoviesFilteredByGenres(
    @Args('genres_id', { type: () => Int }) genresId: number,
  ): Promise<Movie[]> {
    return this.moviesService.getMoviesFilteredByGenres(genresId);
  }

  @Query((returns) => Movie)
  getMovieById(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
    return this.moviesService.getMovie(id);
  }
}
