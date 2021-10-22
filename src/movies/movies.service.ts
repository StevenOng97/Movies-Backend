import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import constants from '../helpers/constants';
import { Movie } from './movie.model';
import { MoviesFilter } from './filter.model';

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService){}
  
  getMovies(page: Number = 1): Observable<AxiosResponse<Movie[]>> {
    const { mainUrl, API_KEY } = constants;

    const endpoint = `${mainUrl}/movie/popular?api_key=${API_KEY}&page=${page}`;
    return this.httpService.get(endpoint).pipe(map((res) => {
      return res.data.results;
    }))
  }

  getMoviesWithFilters(moviesFilter: MoviesFilter): Observable<AxiosResponse<Movie[]>>{
    const { query, with_genres, page } = moviesFilter;
    
    const { mainUrl, API_KEY } = constants;

    const queryParam = query ? `&with_text_query=${query}` : '';
    const withGenresParams = with_genres ? `&with_genres=${with_genres}` : '';
    const pageParam = page ? `&page=${page}` : '';

    const endpoint = `${mainUrl}/discover/movie?api_key=${API_KEY}${pageParam}${withGenresParams}${queryParam}`;

    return this.httpService.get(endpoint).pipe(map((res) => {
      return res.data.results;
    }))
  }

  getMoviesFilteredByGenres(genresId: number): Promise<Movie[]> {
    const { mainUrl, API_KEY } = constants;

    const endpoint = `${mainUrl}/movie/popular?with_genres=${genresId}&api_key=${API_KEY}`;
    return axios
      .get(endpoint)
      .then((resp: any) => {
        if (resp.data) {
          return resp.data.results;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getMovie(id: number): Promise<Movie> {
    const { mainUrl, API_KEY } = constants;

    const endpoint = `${mainUrl}/movie/${id}?api_key=${API_KEY}`;
    return axios
      .get(endpoint)
      .then((resp: any) => {
        if (resp.data) {
          return resp.data;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
