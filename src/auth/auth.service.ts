import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Token } from './objectTypes/token.object';
import { Payload } from './types/payload.type';
import { User } from '@prisma/client';

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
  async refreshToken(token: Token): Promise<Token> {
    let payload: Payload;
    try {
      // get payload from token
      payload = await this.jwtService.verifyAsync(token.token);
      Logger.log('Auth token valid.');
      return await this.validatePayload(token, payload);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        Logger.log('Auth token invalid.');
        return await this.validatePayload(token);
      } else {
        throw new UnauthorizedException('Token expired');
      }
    }
  }

  async validatePayload(token: Token, payload?: Payload): Promise<any> {
    try {
      let user: User;
      if (!payload) {
        // get user from refresh token
        Logger.log('Getting user from refresh token.');
        payload = await this.jwtService.verifyAsync(token.refresh_token);
        user = await this.usersService.findOne(payload.id);
      } else {
        // get user from token
        Logger.log('Getting user from Auth token.');
        user = await this.usersService.findOne(payload.id);
      }
      // check if the refresh token is the same as the one in the database
      if (user.sessionHash !== token.refresh_token) {
        await this.usersService.update(user.id, {
          sessionHash: '',
        });
        Logger.log('Refresh token expired. logging out.');
        throw new UnauthorizedException('Invalid refresh token');
      }

      // create a new payload
      const renewedPayload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      };

      Logger.log('Refreshing token and refresh token.');
      // create new token
      const newToken = await this.jwtService.signAsync(renewedPayload, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      // create new refresh token
      const refresh_token = await this.jwtService.signAsync(renewedPayload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      });

      // update the refresh token in the database
      await this.usersService.update(user.id, {
        sessionHash: refresh_token,
      });
      Logger.log('Tokens refreshed.');
      return {
        token: newToken,
        refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(user: User): Promise<string> {
    try {
      await this.usersService.update(user.id, {
        sessionHash: '',
      });
      return 'Logged out successfully';
    } catch (error) {
      throw new UnauthorizedException('There was a problem logging out');
    }
  }
}
