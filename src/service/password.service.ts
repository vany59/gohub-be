import { SALT } from "@environment";
import * as bcrypt from "bcrypt";

export class passwordService {
  async hass(value) {
    return await bcrypt.hash(value, SALT);
  }

  async compare(value, hass) {
    return await bcrypt.compare(value, hass);
  }
}
