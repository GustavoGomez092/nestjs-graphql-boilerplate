import { Field, ObjectType } from '@nestjs/graphql';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import { User } from 'src/@generated/objectTypes/user/user.model';
import { Pagination } from 'src/pagination/models/pagination.model';

@ObjectType()
export class Users {
  @Field(() => [User], { nullable: 'items' })
  users: User[];
  @Field(() => Pagination, { nullable: true })
  meta: PageNumberPagination;
}
