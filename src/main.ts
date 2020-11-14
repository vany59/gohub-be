import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import {
  NODE_ENV,
  DOMAIN,
  PRIMARY_COLOR,
  PORT,
  SOCKET_PORT
} from "@environment";
import chalk = require("chalk");
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import * as cors from "cors";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as rateLimit from "express-rate-limit";
import { Swagger } from "@configs";
// import "@socketio";
// import "@gateway";

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: false,
      cors: true
    });
    app.setGlobalPrefix("v1");

    NODE_ENV !== "production" && Swagger(app);

    await app.listen(PORT);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(async () => {
        app.close();
      });
    }

    app.useGlobalPipes(new ValidationPipe());

    app.use(compression());

    app.use(helmet());
    app.use(cors());

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
      })
    );

    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      })
    );

    NODE_ENV !== "production" &&
      Logger.log(
        `🚀  Server ready at http://${DOMAIN!}:${chalk
          .hex(PRIMARY_COLOR!)
          .bold(`${PORT!}`)}/`,
        "Bootstrap",
        false
      );

    // Logger.log(
    //   `⌛️ Socket ready at http://${DOMAIN!}:${chalk
    //     .hex(PRIMARY_COLOR!)
    //     .bold(`${SOCKET_PORT!}`)}/`,
    //   "Bootstrap",
    //   false
    // );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, "", "Bootstrap", false);
    process.exit();
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, "", "Bootstrap", false);
  throw e;
});
