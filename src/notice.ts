import notifier = require("node-notifier");

export function showNotice(message: string, title: string, icon?: string) {
  console.log("showNotice", {message, title, icon});
  return notifier.notify(Object.assign({
    title
    , message
  }, icon ? {icon} : {}));
}
