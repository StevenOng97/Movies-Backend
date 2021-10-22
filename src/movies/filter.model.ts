import { Field, Int } from "@nestjs/graphql";

export class MoviesFilter {
  @Field()
  query?: string;

  @Field((type) => Int, { nullable: true })
  with_genres?: number;

  @Field((type) => Int, { nullable: true })
  page?: number;
}
