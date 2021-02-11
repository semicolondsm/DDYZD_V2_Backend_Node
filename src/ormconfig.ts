import { ConnectionOptions } from "typeorm";
import { config } from "./config";
import { ClubTagView, ClubUserView } from "./entity/view";
import { 
   Alarm, Application, Chat, Club, ClubFollow, ClubHasTag, ClubHead, 
   Feed, FeedFlag, FeedMedium, Major, Option, Room, Supply, Tag, User } from "./entity/model";

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
      Alarm, Application, Chat, Club, ClubFollow, ClubHasTag, ClubHead,
      Feed, FeedFlag, FeedMedium, Major, Option, Room, Supply, Tag, User,
      ClubUserView, ClubTagView
   ]
}