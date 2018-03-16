import * as path from "path";

export interface WhiteList {
  name: string
  icon: string
}

export const whiteLists: WhiteList[] = [
  {
    name: "Gena"
    , icon: path.join(__dirname + "/../res/icon.jpg")
  }
];
export const whiteNames = whiteLists.map(x => x.name);
