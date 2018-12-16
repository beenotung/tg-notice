import {spawn} from "child_process";
import {showNotice} from "./notice";
import {str_contains} from "./utils";

export function startTelegram() {
  const child = spawn('telegram-cli');
  let ss: string[] = [];
  child.stdout.on('data', (buffer: Buffer) => {
    const s = buffer.toString();
    ss.push(s);
    if (s.indexOf('\n') !== -1) {
      ss = ss.join('').split('\n');
      const last = ss.pop();
      ss.forEach(line => onLine(line));
      ss = [last];
      return;
    }
  });
  child.on('close', code => {
    console.log('telegram-cli exit with code:', code);
    process.exit(code);
  });
  child.stderr.pipe(process.stderr);
}

function onLine(line: string) {
  if (!str_contains('Gena', line)) {
    return;
  }
  console.log(line);
  if (str_contains(' <<< ', line)) {
    /* message from me */
    console.log('[message from me]');
    return;
  }
  if (str_contains(' >>> ', line)) {
    /* message from gena */
    console.log('[message from Gena]');
    const ss = line.split(' >>> ');
    ss.shift();
    const message = ss.join('Gena >>> ').replace('\u001b[0m', '');
    showNotice(message);
  }
}

