import { createConnection } from "typeorm";
import { createOptions } from "../ormconfig";

export const connectDatabase = () => {
  return new Promise((resolve, reject) => {
    createConnection(createOptions).then((c) => {
      console.log("Database Connect Success");
      resolve(null);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  });
}