import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

class Mission {
  @ApiProperty()
  mission: string;

  @ApiProperty({ type: [String] })
  privileges: string[];
}

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [Mission] })
  @IsNotEmpty()
  missions: Mission[];
}

export class CreateMissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  privileges: string[];
}
