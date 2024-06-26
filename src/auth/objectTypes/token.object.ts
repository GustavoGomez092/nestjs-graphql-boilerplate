import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String)
  token: string;
  @Field(() => String)
  refresh_token: string;
}
