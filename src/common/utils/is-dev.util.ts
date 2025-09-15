import { ConfigService } from '@nestjs/config';

export const isDev = (configService: ConfigService): boolean =>
  configService.getOrThrow<string>('app.is_dev') === 'development';
