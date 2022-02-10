import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CountryModule } from './country/country.module';
import getConfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await getConfig(configService),
    }),
    AuthModule,
    AccountModule,
    UserModule,
    CommonModule,
    CategoryModule,
    ProductModule,
    FavoriteModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
