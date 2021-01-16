import databaseConfigList from "./database-config";

type NodeEnvironment = "production" | "test" | "development";

const env: NodeEnvironment = process.env.NODE_ENV as NodeEnvironment;
const databaseConfig = databaseConfigList[env];

export const config = {
  NodeEnv: env,
  type: databaseConfig.type,
  dbHost: databaseConfig.host,
  dbPort: databaseConfig.port,
  dbUser: databaseConfig.username,
  dbPassword: databaseConfig.password,
  dbName: databaseConfig.database,
  dbSynchronize: databaseConfig.synchronize,
  dbLogging: databaseConfig.logging,
  jwtSecret: process.env.JWT_SECRET,
  ServicePort: process.env.PORT,
} 