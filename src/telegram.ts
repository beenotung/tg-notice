import {spawn} from "child_process";
import {showNotice} from "./notice";
import {compare_number, str_contain_any} from "./utils";
import {whiteList, whiteNames} from "./config";

export function startTelegram() {
  const child = spawn("telegram-cli", ["-b"]);
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
  child.on("close", code => {
    console.log("telegram-cli exit with code:", code);
    process.exit(code);
  });
  child.stderr.pipe(process.stderr);
}

/* send */
const left_arrows = "«<";
/* receive */
const right_arrows = "»>";

function checkArrow(line: string, arrows: string) {
  for (const a of arrows) {
    const pattern = " " + a.repeat(3) + " ";
    if (line.includes(pattern)) {
      return true;
    }
  }
  return false;
}

function isReceivingMessage(line: string): boolean {
  return checkArrow(line, right_arrows);
}

function isSendingMessage(line: string): boolean {
  return checkArrow(line, left_arrows);
}

function getArrowChar(line: string): string {
  const cs = [];
  cs.push(...left_arrows.split(""));
  cs.push(...right_arrows.split(""));
  const xs = cs
    .map(c => ({
      c,
      idx: line.indexOf((c as string).repeat(3))
    }))
    .filter(x => x.idx !== -1);
  xs.sort((a, b) => compare_number(a.idx, b.idx));
  return xs[0].c;
}

function getArrowPattern(line: string): string {
  return " " + getArrowChar(line).repeat(3) + " ";
}

type MessageMode = "receive" | "send";

interface Message {
  sender: string
  message: string
  mode: MessageMode
}

function extractMessage(line: string): Message {
  const arrow_pattern = getArrowPattern(line);
  const ss = line.split(arrow_pattern);
  let sender = ss.shift().split("]")[1].trim();
  /* remove unicode sequence that control coloring */
  sender = sender.substring(19, sender.length - 18);
  const message = ss.join(arrow_pattern).replace("\u001b[0m", "");
  let mode: MessageMode;
  if (isReceivingMessage(line)) {
    mode = "receive";
  } else if (isSendingMessage(line)) {
    mode = "send";
  }
  return {
    mode,
    sender,
    message,
  };
}

function onLine(line: string) {
  console.debug(line);
  if (!(isSendingMessage(line) || isReceivingMessage(line))) {
    /* system message */
    return;
  }
  const msg = extractMessage(line);
  console.debug("message:", msg);
  if (!str_contain_any(whiteNames, msg.sender)) {
    return;
  }
  if (msg.mode === "send") {
    /* message from myself */
    console.log("[message from myself]");
    return;
  }
  if (msg.mode === "receive") {
    /* message from whitelist */
    const sender = msg.sender;
    if (sender === undefined) {
      console.error("sender is not found on the line:", line);
      return;
    }
    console.log(`[message from ${sender}]`);
    const sender_icon = whiteList.filter(x => x.name === sender)[0].icon;
    const message = msg.message;
    showNotice(message, sender + ":", sender_icon);
    return;
  }
  /* other case? */
}
