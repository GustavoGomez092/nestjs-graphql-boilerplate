import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Users } from './objectTypes/users.type';
import { Me } from 'src/auth/decorators/me.decorator';
import { User } from 'src/@generated/objectTypes/user/user.model';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => Users)
  async users(
    @Args('limit', { nullable: true }) limit: number,
    @Args('page', { nullable: true }) page: number,
  ): Promise<Users> {
    try {
      return this.userService.findAll(limit, page);
    } catch (error) {
      throw new Error('There was a problem fetching users');
    }
  }

  @Query(() => User)
  async me(@Me() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }
}
