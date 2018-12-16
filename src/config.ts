import * as path from "path";

export const app = {name: "TG Notice"};

export interface WhiteListItem {
  name: string
  icon: string
}

export const whiteList: WhiteListItem[] = [
  {
    name: "Gena"
    , icon: path.join(__dirname + "/../res/icon.jpg")
    // , icon: 'http://127.0.0.1:8080/ipfs/QmQhUFNnrk1XxFARWMUVnmQ5jW2bdPQmToFgP8QV5uKtM1'
  }
];
export const whiteNames = whiteList.map(x => x.name);

export function setWhiteList(xs: WhiteListItem[]) {
  whiteList.splice(0);
  whiteList.push(...xs);
  whiteNames.splice(0);
  whiteNames.push(...xs.map(x => x.name));
}
