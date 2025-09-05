import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';
export interface RequestWithUser extends Request {
  user: User;
}

export const Authorized = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext): any => {
    const request: RequestWithUser = ctx
      .switchToHttp()
      .getRequest<RequestWithUser>();
    const { user } = request;

    return data ? user?.[data] : user;
  },
);
