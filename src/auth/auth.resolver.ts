import { AuthService } from './auth.service';
import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlLocalAuthGuard } from './guards/local.auth.guard';
import { SignupInput } from './inputTypes/signup.input';
import { UserService } from 'src/user/user.service';
import { Token } from './objectTypes/token.object';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() req: any,
  ): Promise<Token> {
    try {
      return this.authService.login(req.req.user);
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(error.message);
    }
  }

  @Public()
  @Mutation(() => String)
  async signUp(@Args('signupInput') signupInput: SignupInput): Promise<string> {
    try {
      const user = {
        email: signupInput.email,
        firstname: signupInput.firstname,
        lastname: signupInput.lastname,
        password: signupInput.password,
      };
      await this.userService.create(user);
      return 'User created successfully';
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(error.message);
    }
  }
}
