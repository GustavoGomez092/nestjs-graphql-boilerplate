import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsDefined,
  IsStrongPassword,
  IsString,
  IsIn,
  ValidateIf,
  Length,
} from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o) => o.password !== o.confirmPassword)
  confirmPassword: string;

  @Field()
  @IsDefined()
  @IsString()
  @Length(2, 64)
  firstname: string;

  @Field()
  @IsDefined()
  @IsString()
  @Length(2, 64)
  lastname: string;
}
