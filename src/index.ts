import {app, setWhiteList, WhiteListItem} from "./config";
import {startTelegram} from "./telegram";
import {greet} from "./notice";

export function startTGNotice(userWhiteList?: WhiteListItem[], appName?: string) {
  if (Array.isArray(userWhiteList)) {
    setWhiteList(userWhiteList);
  }
  if (typeof appName === "string") {
    app.name = appName;
  }
  startTelegram();
  greet();
}
