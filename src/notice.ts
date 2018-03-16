import notifier = require("node-notifier");
import {app} from "./config";

export function greet() {
  return notifier.notify({
    title: app.name
    , message: "Ready"
  });
}

export function showNotice(message: string, title: string, icon?: string) {
  console.log("showNotice", {message, title, icon});
  return notifier.notify(Object.assign({
    title
    , message
  }, icon ? {icon} : {}));
}
