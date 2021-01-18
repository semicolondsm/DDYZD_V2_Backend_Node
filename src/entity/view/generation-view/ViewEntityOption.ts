import fs from "fs";
import path from "path";

export class CustomViewEntityOption {
  public readonly expression: string;
  public readonly name: string;

  constructor(viweName: string, queryPath: string) {
    this.expression = fs.readFileSync(path.join(__dirname, `./query/${queryPath}`), { encoding: "utf8" });
    this.name = viweName;
  }
}