import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Username = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.username;
  }
);
