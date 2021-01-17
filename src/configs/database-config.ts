import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const databaseConfigList = {
  development: {
    type: "mysql",
    host: process.env.DEVELOPMENT_HOST,
    port: +process.env.DEVELOPMENT_PORT,
    username: process.env.DEVELOPMENT_USERNAME,
    password: process.env.DEVELOPMENT_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE,
    synchronize: true,
    logging: true,
  },
  test: {
    type: "mysql",
    host: process.env.TEST_HOST,
    port: +process.env.TEST_PORT!,
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    synchronize: false,
    logging: false,
  },
  production: {
    type: "mysql",
    host: process.env.PRODUCTION_HOST,
    port: +process.env.PRODUCTION_PORT!,
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    synchronize: false,
    logging: true,
  }
}

export default databaseConfigList;