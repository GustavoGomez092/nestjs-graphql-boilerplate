import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../../@generated/objectTypes/prisma/role.enum';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => String, { nullable: false })
  email!: string;

  @HideField()
  password!: string;

  @Field(() => String, { nullable: false })
  firstname!: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => Role, { nullable: true })
  role?: keyof typeof Role;
}
