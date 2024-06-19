import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class TokenInput {
  @Field()
  @IsDefined()
  token: string;

  @Field()
  @IsDefined()
  refresh_token: string;
}
