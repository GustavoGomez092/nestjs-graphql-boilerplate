import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Users } from './objectTypes/users.type';
import { Me } from 'src/auth/decorators/me.decorator';
import { User } from 'src/@generated/objectTypes/user/user.model';
import { Log } from 'src/log/log.decorator';
import { EntitiesDictionary } from 'src/utils/entities.dictionary';
import { ActionsDictionary } from 'src/utils/actions.dictionary';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => Users)
  @Log({ entity: EntitiesDictionary.USER, action: ActionsDictionary.READ })
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
  @Log({ entity: EntitiesDictionary.USER, action: ActionsDictionary.READ })
  async me(@Me() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }
}
