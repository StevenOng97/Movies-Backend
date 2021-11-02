import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Genre } from '../genres/genre.model';

@ObjectType('Movie')
export class Movie {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Int])
  genre_ids?: number[];

  @Field((type) => [Genre], { nullable: true })
  genres?: Genre[];

  @Field()
  original_title?: string;

  @Field()
  original_language?: string;

  @Field()
  adult?: false;
  
  @Field()
  overview?: string;

  @Field()
  popularity?: number;

  @Field()
  backdrop_path?: string;

  @Field()
  poster_path?: string;
  
  @Field({ nullable: true })
  release_date?: string;

  @Field((type) => Int, { nullable: true })
  vote_average?: number;

  @Field((type) => Int, { nullable: true })
  vote_count?: number;
}
