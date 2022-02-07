import { ConfigService } from '@nestjs/config';

interface ISignOptions {
  expiresIn: string;
}

interface IJwtConstants {
  secret: string;
  signOptions: ISignOptions;
}

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<IJwtConstants> => ({
  secret: configService.get<string>('SECRET_STRING'),
  signOptions: { expiresIn: '1d' },
});
