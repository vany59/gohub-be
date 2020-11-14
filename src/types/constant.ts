import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";
import { UtilDto } from "./util.dto";

export class InputDistrictDto extends UtilDto {
  @ApiProperty()
  @IsNotEmpty()
  province: string;
}

export class InputWardDto extends UtilDto {
  @ApiProperty()
  @IsNotEmpty()
  district: string;
}
