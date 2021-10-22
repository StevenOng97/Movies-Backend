import { Injectable } from '@nestjs/common';
import { Genre } from './genre.model';
import axios from 'axios';
import constants from '../helpers/constants';

@Injectable()
export class GenresService {
  getListGenres(): Promise<Genre[]> {
    const { mainUrl, API_KEY } = constants;

    const endpoint = `${mainUrl}/genre/movie/list?api_key=${API_KEY}`;

    return axios
      .get(endpoint)
      .then((resp: any) => {
        if (resp.data) {
          return resp.data.genres;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
