import { Injectable, Logger } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import {
  getMetadataArgsStorage,
  createConnection,
  getConnection,
} from "typeorm";

import config from "../../config.orm";
// import { logger } from '../../common'

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      ...config,
      type: "mongodb",
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // reconnectTries: Infinity,
      keepConnectionAlive: true,
      logging: true,
      cache: true,
    };
    await createConnection(options)
      .then((data) => {
        Logger.log(`☁️  Database connected`, "TypeORM", false);
      })
      .catch(async (err) => {
        if (err.name === "AlreadyHasActiveConnectionError") {
          const connection = getConnection();
          await connection.close().then(async () => {
            await createConnection(options).then((data) => {
              Logger.log(`☁️  Database connected`, "TypeORM", false);
            });
          });
        } else {
          console.log(err);
          Logger.error(`❌  Database connect error`, "", "TypeORM", false);
        }
      });

    return options;
  }
}
