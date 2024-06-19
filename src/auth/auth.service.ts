import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Token } from './objectTypes/token.object';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    try {
      if (await argon2.verify(user.password, pass)) {
        const { ...result } = user;
        return result;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error('There was a problem logging in, please try again later');
    }
  }

  async login(user: any): Promise<Token> {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(payload);

      const refresh_token = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      });

      await this.usersService.update(user.id, {
        sessionHash: refresh_token,
      });

      return {
        token,
        refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'There was a problem logging in, please try again later',
      );
    }
  }
}
