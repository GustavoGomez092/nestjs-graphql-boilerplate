import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'nestjs-prisma';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogService } from 'src/log/log.service';

@Module({
  providers: [UserService, UserResolver, PrismaService, LogService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
