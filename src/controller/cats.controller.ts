import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@guard";
import { ERROR } from "@res";

@UseGuards(AuthGuard)
@ApiTags("cats")
@ApiBearerAuth()
@Controller("cats")
export class CatsController {
  @Get("/")
  async cats() {
    try {
      return "This action returns all cats";
    } catch (e) {
      return ERROR()
    }
  }
}
