import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '@app/jwtconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await getJwtConfig(configService),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class CommonModule {}
