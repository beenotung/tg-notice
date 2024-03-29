# TG Notice

Get notice from telegram user's messages over telegram api.

[![npm Package Version](https://img.shields.io/npm/v/tg-notice.svg?maxAge=3600)](https://www.npmjs.com/package/tg-notice)

## Setup

### ArchLinux with yaourt

run `./setup`

press [Ctrl + C] after login

### General

run `telegram-cli` (only once on this device).
Finish the login action.

Then run `npm install && npm run build`


## Install with npm
```bash
npm i -g tg-notice
```

## Running

Just get message from one friend:
```bash
tg-notice name=Gena
```

You can also specify the `icon` for the friend:
```bash
tg-notice name=Gena icon=res/gena.png
```

Run with more settings:
```bash
tg-notice app="Gena Notice" name=Gena name="Beeno Tung"
```

Setting multiple `name` will trigger notice when a message is sent from any of the users.

You can also specify the `icon` of for each `name` alternatively:
```bash
tg-notice app="Gena Notice" \
  name=Gena icon=res/gena.png \
  name="Beeno Tung" icon=res/beeno.png \
```

## Run with Daemon

1. put the scripts folder into `PATH`
2. make sure this repo is cloned on ~/local/opt.
   otherwise update the scripts/tg-notice line 17 (the cd command)
3. run tg-notice from the shell

## License
[BSD-2-Clause](./LICENSE) (Free and Open Sourced Software)
