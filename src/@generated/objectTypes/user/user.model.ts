import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @HideField()
    createdAt!: Date;

    @HideField()
    updatedAt!: Date;

    @Field(() => String, {nullable:false})
    email!: string;

    @HideField()
    password!: string;

    @HideField()
    sessionHash!: string | null;

    @Field(() => String, {nullable:false})
    firstname!: string;

    @Field(() => String, {nullable:true})
    lastname!: string | null;

    @Field(() => Role, {nullable:false,defaultValue:'USER'})
    role!: keyof typeof Role;
}
