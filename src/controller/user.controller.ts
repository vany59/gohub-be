import {
  Body,
  Controller,
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
import { JwtService, passwordService } from "@service";
import { CreateRoleDto, CreateUserDto, LoginDto, UtilDto } from "@types";
import { AuthGuard, RoleGuard } from "@guard";
import { Token, Username } from "@decorator";
import { ERROR, OK, UNAUTH } from "@res";
import { ValidationPipe } from "../shared";
import * as _ from "lodash";
import { M_ACCOUNT, P_READ } from "@constant";
import { Filters } from "@utils";

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
      delete me.password;
      const id = me._id;
      delete me._id;
      return OK({
        id,
        ...me,
        access_token: token
      });
    } catch (e) {
      return ERROR(e);
    }
  }

  @Post("/paging")
  @HttpCode(200)
  @UseGuards(new RoleGuard([{ mission: M_ACCOUNT, privileges: [P_READ] }]))
  async gets(@Body() body: UtilDto) {
    const { filters } = body;
    const item = Filters(filters);
    const accountRepo = getMongoRepository(User);
    const accountPaging = await accountRepo.find({ ...item });
    const data = accountPaging.map((account) => ({
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

      const hasspass = await passwordService.prototype.hass(body.password);
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
      await userRepo.save(new User({ ...body, _id }));
      return OK();
    } catch (e) {
      return ERROR();
    }
  }
}
