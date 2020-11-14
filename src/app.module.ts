import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormService } from "@configs";
import * as controller from "./controller";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
  ],
  controllers: [...Object.values(controller)],
})
export class AppModule {}
