import { Role, User } from "@models";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UNAUTH } from "@res";
import { JwtService } from "@service";
import { getMongoRepository } from "typeorm";
import { CheckMission } from "@utils";

class Mission {
  mission: string;
  privileges: string[];
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private missions: Mission[]) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const verifyToken = JwtService.prototype.verify(
        request.headers.authorization
      );

      if (verifyToken.error) {
        console.log("token", verifyToken);
        throw new Error();
      }
      const { username } = verifyToken;
      request.username = username;
      request.token = JwtService.prototype.getToken(
        request.headers.authorization
      );
      const userModel = getMongoRepository(User);
      const roleModel = getMongoRepository(Role);
      const user = await userModel.findOne({ username });
      const { role, isRoot } = user;
      if (isRoot) {
        return true;
      }
      const userRoles = await roleModel.findOne({ _id: role });
      const { missions } = userRoles;
      const session = {
        isRoot,
        missions
      };
      const isNext = CheckMission(session, this.missions);
      console.log("check ", isNext);
      return isNext ? true : UNAUTH(`Permission denied`);
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
