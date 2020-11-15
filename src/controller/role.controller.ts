import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard, RoleGuard } from "@guard";
import { ERROR, OK } from "@res";
import { getMongoRepository, MongoRepository } from "typeorm";
import { Mission, Role } from "@models";
import { CreateMissionDto, CreateRoleDto, UtilDto } from "@types";
import { ValidationPipe } from "../shared";
import { M_TEACHER, P_CREATE, P_DELETE, P_READ, P_UPDATE } from "@constant";
import { Filters } from "@utils";
import * as _ from "lodash";

@Controller("roles")
@UsePipes(ValidationPipe)
export class RolesController {
  @Post("/mission/create")
  async createMission(@Body() body: CreateMissionDto) {
    try {
      const { name, privileges } = body;
      const missionRepo = getMongoRepository(Mission);
      const data = await missionRepo.save(new Mission({ name, privileges }));
      return OK();
    } catch (e) {
      return ERROR();
    }
  }

  @Post("/create")
  async createRole(@Body() body: CreateRoleDto) {
    try {
      const roleModel = getMongoRepository(Role);
      await roleModel.save(new Role({ ...body }));
      return OK();
    } catch (e) {
      return ERROR(e);
    }
  }

  @Put("/:id")
  async updateRole(@Body() body: CreateRoleDto, @Param() param: any) {
    try {
      const { id } = param;
      const roleModel = getMongoRepository(Role);
      await roleModel.save(new Role({ ...body, _id: id }));
      return OK();
    } catch (e) {
      return ERROR(e);
    }
  }

  @Post("/role/paging")
  @UseGuards(
    new RoleGuard([
      { mission: M_TEACHER, privileges: [P_READ, P_CREATE, P_UPDATE, P_DELETE] }
    ])
  )
  async findRole(@Body() body: UtilDto) {
    try {
      const { filters } = body;
      const item = Filters(filters);
      const roleModel = getMongoRepository(Role);
      const roles = await roleModel.find({ ...item });
      const data = roles.map((role) => ({
        id: role._id,
        ..._.omit(role, ["_id"])
      }));
      return OK(data);
    } catch (e) {
      return ERROR(e);
    }
  }
}
