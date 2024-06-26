import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [CustomPrismaModule],
})
export class PrismaModule {}
