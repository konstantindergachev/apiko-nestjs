import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const getConfig = async (
  configService: ConfigService,
): Promise<ConnectionOptions> => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
});

export default getConfig;
