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
import { District, Mission, Privilege, Province, Ward } from "@models";
import { getMongoRepository } from "typeorm";
import { InputDistrictDto, InputWardDto, UtilDto } from "@types";
import { ERROR, OK } from "@res";
import { Filters } from "@utils";

// @UseGuards(AuthGuard)
@ApiTags("constant")
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@Controller("constant")
export class ProvinceController {
  @Post("/province/paging")
  @ApiBody({ type: UtilDto, required: false })
  async province(@Body() body: UtilDto) {
    const { filters } = body;
    try {
      const province = await getMongoRepository(Province);
      let provinceList = await await province.find();
      if (filters) {
        filters.forEach(({ key, value }) => {
          key = key === "id" ? "_id" : key;
          provinceList = provinceList.filter((item) => item[key] === value);
        });
      }
      const data = provinceList.map((item) => ({
        id: item._id,
        name: item.label
      }));
      return OK(data);
    } catch (e) {
      return ERROR(e);
    }
  }

  @Post("/district/paging")
  @ApiBody({ type: UtilDto, required: false })
  async district(@Body() body: UtilDto) {
    const { filters } = body;
    const item = Filters(filters);
    // console.log({ ...item });
    const districts = await getMongoRepository(District).find({ ...item });
    const data = districts.map(({ _id, label }) => ({ id: _id, name: label }));
    return OK(data);
  }

  @Post("/ward/paging")
  @ApiBody({ type: UtilDto, required: false })
  async ward(@Body() body: UtilDto) {
    // console.log(body);
    const { filters } = body;
    const item = Filters(filters);
    const wards = await getMongoRepository(Ward).find({ ...item });
    const data = wards.map(({ _id, label }) => ({ id: _id, name: label }));
    return OK(data);
  }

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
