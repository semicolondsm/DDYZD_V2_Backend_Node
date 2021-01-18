import { ConnectionOptions } from "typeorm";
import { config } from "./configs";

export const createOptions: ConnectionOptions = {
   type: "mysql",
   host: config.dbHost,
   port: config.dbPort,
   username: config.dbUser,
   password: config.dbPassword,
   database: config.dbName,
   synchronize: config.dbSynchronize,
   logging: config.dbLogging,
   entities: [
      "src/entity/models/**/*.ts",
      "src/entity/views/**/*.ts"
   ]
}