import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  Min,
  MinLength
} from "class-validator";

enum userType {
  student,
  teacher
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @ApiProperty()
  @MinLength(6, { message: "Password to short" })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  // @Matches(
  //   /^(09[0|1|2|3|4|6|7|8|9]|08[1|2|3|4|5|6|8|9]|07[0|6|7|8|9]|05[6|8|9]|03[2|3|4|5|6|7|8|9])+([0-9]{7})$\b/,
  //   { message: "phone must be a valid phone number" }
  // )
  phone: string;

  @IsNotEmpty()
  type: userType;

  @IsNotEmpty()
  role: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

class user {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;
}

class privilege {
  @ApiProperty()
  id: string;
}

class mission {
  @ApiProperty()
  id: string;

  @ApiProperty()
  privileges: privilege[];
}

export class me {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  isAdmin: string;

  @ApiProperty()
  user: user;

  @ApiProperty()
  missions: mission[];
}
