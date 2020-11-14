import { HttpException, HttpStatus } from "@nestjs/common";

export function OK(data = null) {
  // return new HttpException(
  //   {
  //     code: 200,
  //     message: "Success",
  //     data: data
  //   },
  //   HttpStatus.OK
  // );
  return {
    code: 200,
    message: "Success",
    data: data
  };
}

export function ERROR(message = "Error") {
  // return new HttpException(
  //   {
  //     code: 400,
  //     message: message,
  //     data: null
  //   },
  //   HttpStatus.OK
  // );
  return {
    code: 400,
    message: message,
    data: null
  };
}

export function UNAUTH(message = "Unauthrized") {
  // return new HttpException(
  //   {
  //     code: 401,
  //     message: message,
  //     data: null
  //   },
  //   HttpStatus.OK
  // );
  return {
    code: 401,
    message: message,
    data: null
  };
}
