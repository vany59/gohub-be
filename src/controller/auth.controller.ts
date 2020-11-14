import { User } from "@models";
import { Body, Controller, Post, Put } from "@nestjs/common";
import { ERROR, OK, UNAUTH } from "@res";
import { JwtService, passwordService } from "@service";
import { LoginDto } from "@types";
import { getMongoRepository } from "typeorm";

@Controller()
export class AuthController {
  @Post("/login")
  async login(@Body() body: LoginDto) {
    try {
      const userRepo = await getMongoRepository(User);
      const existedUser = await userRepo.findOne({
        username: body.username
      });
      if (!existedUser) return UNAUTH("Login fail");
      const checkPassword = await passwordService.prototype.compare(
        body.password,
        existedUser.password
      );
      if (!checkPassword) return UNAUTH("Login fail");

      const jwtSign = JwtService.prototype.sign({ username: body.username });
      return OK({ access_token: jwtSign });
      return OK();
    } catch (e) {
      return ERROR(e);
    }
  }
}
