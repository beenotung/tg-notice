#!/usr/bin/env node
import {startTGNotice} from "./app";
import {WhiteListItem} from "./config";

let appName: string;
let userWhiteList: WhiteListItem[];

let name: string;
let icon: string;

function setWhiteListItem(x: WhiteListItem) {
  if (!userWhiteList) {
    userWhiteList = [];
  }
  userWhiteList.push(x);
}

function setName(s: string) {
  if (name) {
    setWhiteListItem({name, icon: icon || ""});
    name = s;
    icon = undefined;
  } else {
    name = s;
  }
}

function setIcon(s: string) {
  if (icon) {
    setWhiteListItem({name, icon: icon || ""});
    name = undefined;
    icon = s;
  } else {
    icon = s;
  }
}

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg.startsWith("app=")) {
    appName = arg.replace("app=", "");
    continue;
  }
  if (arg.startsWith("name=")) {
    setName(arg.replace("name=", ""));
    continue;
  }
  if (arg.startsWith("icon=")) {
    setIcon(arg.replace("icon=", ""));
    continue;
  }
  console.error("unknown arg:", arg);
  process.exit(1);
}
if (name || icon) {
  setWhiteListItem({name, icon});
}

startTGNotice(userWhiteList, appName);
