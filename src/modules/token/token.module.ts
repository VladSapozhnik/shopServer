import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.secret'),
        signOptions: {
          algorithm: 'HS256',
          expiresIn: configService.getOrThrow<string>('jwt.access_token'),
        },
        verifyOptions: {
          algorithms: ['HS256'],
          ignoreExpiration: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
