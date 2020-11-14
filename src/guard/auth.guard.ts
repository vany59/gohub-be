import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { UNAUTH } from "@res";
import { JwtService } from "@service";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): any | Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const verifyToken = JwtService.prototype.verify(
        request.headers.authorization
      );

      if (verifyToken.error) {
        throw new HttpException(
          {
            code: 401,
            message: "Unauthrized",
            data: null
          },
          HttpStatus.OK
        );
      }
      request.username = verifyToken.username;
      request.token = JwtService.prototype.getToken(
        request.headers.authorization
      );
      return true;
    } catch (e) {
      throw new HttpException(
        {
          code: 401,
          message: "Unauthrized",
          data: null
        },
        HttpStatus.OK
      );
    }
  }
}
