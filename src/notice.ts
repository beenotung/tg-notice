import * as path from "path";
import notifier = require("node-notifier");

const icon_path = path.join(__dirname + "/../res/icon.jpg");
// const icon_path = 'http://127.0.0.1:8080/ipfs/QmQhUFNnrk1XxFARWMUVnmQ5jW2bdPQmToFgP8QV5uKtM1';

notifier.notify({
  title: "Gena Notice"
  , message: "Ready"
});

export function showNotice(message: string, title = "Message from Gena", icon = true) {
  console.log("showNotice", {message, title, icon});
  return notifier.notify(Object.assign({
    title
    , message
  }, icon ? {icon: icon_path} : {}));
}
