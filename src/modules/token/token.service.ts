import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class TokenService {
  private readonly JWT_REFRESH_TOKEN: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_REFRESH_TOKEN =
      this.configService.getOrThrow<string>('jwt_refresh_token');
  }
  async generateToken(
    user: User,
  ): Promise<{ assessToken: string; refreshToken: string }> {
    const payload = {
      id: Number(user.id),
      email: user.email,
      role: user.role,
    };

    const assessToken: string = await this.jwtService.signAsync(payload);

    const refreshToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN,
    });

    return { assessToken, refreshToken };
  }
}
