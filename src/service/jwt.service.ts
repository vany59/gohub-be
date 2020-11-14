import { PRIVATE } from "@environment";
import * as jwt from "jsonwebtoken";

export class JwtService {
  sign(value) {
    return jwt.sign(value, PRIVATE);
  }

  verify(value) {
    try {
      const getToken = value.split(" ")[1];
      return jwt.verify(getToken, PRIVATE, (err, decode) => {
        if (err) return { error: "fail" };
        return decode;
      });
    } catch (e) {
      return { error: "fail" };
    }
  }

  getToken(value) {
    try {
      return value.split(" ")[1];
    } catch (e) {
      return { error: "fail" };
    }
  }
}
