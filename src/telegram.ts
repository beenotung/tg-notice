import {spawn} from "child_process";
import {showNotice} from "./notice";
import {str_contain_any, str_contains} from "./utils";
import {whiteNames} from "./config";

export function startTelegram() {
  const child = spawn("telegram-cli");
  let ss: string[] = [];
  child.stdout.on("data", (buffer: Buffer) => {
    const s = buffer.toString();
    ss.push(s);
    if (s.indexOf("\n") !== -1) {
      ss = ss.join("").split("\n");
      const last = ss.pop();
      ss.forEach(line => onLine(line));
      ss = [last];
      return;
    }
  });
  child.stderr.pipe(process.stderr);
}

function onLine(line: string) {
  if (!str_contain_any(whiteNames, line)) {
    return;
  }
  const group_and_sender = line
    .split(" <<< ")[0]
    .split("]")[1]
    .trim();
  const sender = whiteNames.find(p => str_contains(p, group_and_sender));
  console.log(line);
  if (str_contains(" <<< ", line)) {
    /* message from myself */
    return;
  }
  if (str_contains(" >>> ", line)) {
    /* message from whitelist */
    console.log(`[message from ${sender}]`);
    const ss = line.split(" >>> ");
    ss.shift();
    const message = ss.join(" >>> ").replace("\u001b[0m", "");
    showNotice(message);
  }
}
