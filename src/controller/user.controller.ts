import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { getMongoRepository } from "typeorm";
import { User, Role } from "@models";
import { JwtService, passwordService, sendMail } from "@service";
import { CreateRoleDto, CreateUserDto, LoginDto, UtilDto } from "@types";
import { AuthGuard, RoleGuard } from "@guard";
import { Token, Username } from "@decorator";
import { ERROR, OK, UNAUTH } from "@res";
import { ValidationPipe } from "../shared";
import * as _ from "lodash";
import { M_ACCOUNT, P_READ } from "@constant";
import { Filters } from "@utils";
import * as generator from "generate-password";

@Controller("account")
@UsePipes(ValidationPipe)
export class UserController {
  @Get("/me")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  async me(@Username() username: string, @Token() token: string) {
    try {
      const userRepo = getMongoRepository(User);
      let me = await userRepo.findOne({ username: username });
      const { role } = me;
      const roleRepo = getMongoRepository(Role);
      const _role = await roleRepo.findOne({ _id: role });
      const { missions } = _role;
      delete me.password;
      const id = me._id;
      delete me._id;
      return OK({
        id,
        ...me,
        access_token: token,
        missions
      });
    } catch (e) {
      return ERROR(e);
    }
  }

  @Post("/paging")
  @HttpCode(200)
  @UseGuards(new RoleGuard([{ mission: M_ACCOUNT, privileges: [P_READ] }]))
  async gets(@Body() body: UtilDto, @Username() username: string) {
    const { filters } = body;
    const item = Filters(filters);
    const accountRepo = getMongoRepository(User);
    const accountPaging = await accountRepo.find({ ...item, isActive: true });
    const data = accountPaging
      .filter((account) => account.username !== username)
      .map((account) => ({
        id: account._id,
        ..._.omit(account, ["_id"])
      }));
    return OK(data);
  }

  @Post("/create")
  @ApiBody({ type: CreateUserDto })
  async create(@Body() body: CreateUserDto) {
    try {
      const userRepo = getMongoRepository(User);
      const isExistedUser = await userRepo.findOne({
        username: body.username
      });

      if (isExistedUser) return ERROR("Existed user");

      var password = generator.generate({
        length: 6,
        numbers: true
      });
      sendMail({
        to: body.email,
        username: body.username,
        code: password
      });

      body.password = password;

      const hasspass = await passwordService.prototype.hass(body.password);
      if (body.type.toString() === "teacher") {
        body.role = "6f43e110-262f-11eb-8bd1-bbfd3a1828e6";
      } else {
        body.role = "1f6b3490-262f-11eb-8bd1-bbfd3a1828e6";
      }
      await userRepo.save(
        new User({
          ...body,
          password: hasspass
        })
      );

      return OK();
    } catch (e) {
      return ERROR();
    }
  }

  @Put("/:_id")
  async updateAccount(@Param() param: any, @Body() body: CreateUserDto) {
    try {
      const { _id } = param;
      const userRepo = getMongoRepository(User);
      if (body.type.toString() === "teacher") {
        body.role = "6f43e110-262f-11eb-8bd1-bbfd3a1828e6";
      } else {
        body.role = "1f6b3490-262f-11eb-8bd1-bbfd3a1828e6";
      }
      await userRepo.save(new User({ ...body, _id }));
      return OK();
    } catch (e) {
      return ERROR();
    }
  }

  @Delete("/:_id")
  async deleteAccount(@Param() param: any) {
    try {
      const { _id } = param;
      const userRepo = getMongoRepository(User);
      const user = await userRepo.findOne({ _id });
      user.isActive = false;
      userRepo.save(user);
      return OK();
    } catch (e) {
      return ERROR();
    }
  }
}
