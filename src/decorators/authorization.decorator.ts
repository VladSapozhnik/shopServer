import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../modules/user/guards/jwt-auth.guard';

export const Authorization = () => applyDecorators(UseGuards(JwtAuthGuard));
