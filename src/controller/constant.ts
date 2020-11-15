import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@guard";
import { Mission, Privilege } from "@models";
import { getMongoRepository } from "typeorm";
import { InputDistrictDto, InputWardDto, UtilDto } from "@types";
import { ERROR, OK } from "@res";
import { Filters } from "@utils";

@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
@Controller("constant")
export class ConstantController {
  @Put("/privilege")
  async privilege(@Body() body: any) {
    try {
      const { name } = body;
      const privilegeModel = await getMongoRepository(Privilege);
      await privilegeModel.save(new Privilege({ name }));
      return OK();
    } catch (e) {
      return ERROR(e);
    }
  }

  @Post("/privilege/paging")
  async getPrivilege() {
    try {
      const privilegeModel = await getMongoRepository(Privilege);
      const privileges = await privilegeModel.find();
      const data = privileges.map(({ _id, name }) => ({ id: _id, name }));
      return OK(data);
    } catch (e) {
      return ERROR(e);
    }
  }

  @Put("/mission")
  async mission(@Body() body: any) {
    try {
      const { name, privileges } = body;
      const missionModel = await getMongoRepository(Mission);
      await missionModel.save(
        new Mission({
          name,
          privileges: [
            "f3dffae0-1873-11eb-95f6-8d165ade4f8c", //DELETE
            "f1fff040-1873-11eb-95f6-8d165ade4f8c", //UPDATE
            "efed3ce0-1873-11eb-95f6-8d165ade4f8c", //CREATE
            "eda34ce0-1873-11eb-95f6-8d165ade4f8c" //READ
          ]
        })
      );
      return OK();
    } catch (e) {
      return ERROR(e);
    }
  }

  @Post("/mission/paging")
  async getMission() {
    try {
      const missionModel = await getMongoRepository(Mission);
      const missions = await missionModel.find();
      const data = missions.map(({ _id, name, privileges }) => ({
        id: _id,
        name,
        privileges
      }));
      return OK(data);
    } catch (e) {
      return ERROR(e);
    }
  }
}
