import { User } from '../@generated/objectTypes/user/user.model';
import { UserCreateInput } from './inputs/user.create.input';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { type ExtendedPrismaClient } from '../prisma/prisma.extension';
import * as argon2 from 'argon2';
import { Users } from './objectTypes/users.type';
import { UserUpdateInput } from './inputs/user.update.input';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async findAll(limit = 10, page = 1, includePageCount = true): Promise<Users> {
    const [users, meta] = await this.prismaService.client.user
      .paginate()
      .withPages({
        limit,
        page,
        includePageCount,
      });

    return {
      users,
      meta,
    };
  }

  async findOne(id: string): Promise<User> {
    try {
      return this.prismaService.client.user.findUnique({ where: { id } });
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.prismaService.client.user.findUnique({ where: { email } });
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async create(data: UserCreateInput): Promise<User> {
    try {
      // check if user email already exists
      const user = await this.findByEmail(data.email);
      if (user) {
        throw new Error('The provided email already exists');
      }
      try {
        // obfuscate password with Argon2
        const hash = await argon2.hash(data.password);
        data.password = hash;
      } catch (error) {
        throw new error('Error hashing password');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return this.prismaService.client.user.create({ data });
  }

  async update(id: string, data: UserUpdateInput): Promise<User> {
    try {
      return this.prismaService.client.user.update({ where: { id }, data });
    } catch (error) {
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async delete(id: string): Promise<User> {
    try {
      return this.prismaService.client.user.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}
