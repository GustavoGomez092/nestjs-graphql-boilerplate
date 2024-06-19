import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field()
  isFirstPage: boolean;
  @Field()
  isLastPage: boolean;
  @Field()
  currentPage: number;
  @Field({ nullable: true })
  previousPage: number | null;
  @Field({ nullable: true })
  nextPage: number | null;
  @Field()
  pageCount: number;
  @Field()
  totalCount: number;
}
