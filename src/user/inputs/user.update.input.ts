import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Role } from '../../@generated/objectTypes/prisma/role.enum';

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  sessionHash?: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => Role, { nullable: true })
  role?: keyof typeof Role;
}
