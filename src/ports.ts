import {setWindowProp} from "@beenotung/tslib";

const path = require('path');
const Elm = require('../dist/elm.js');
const container = document.getElementById('container');
const elmApp = Elm.Main.embed(container);

// const icon_path = path.join(__dirname, '../res/icon.jpg');
const icon_path = 'http://127.0.0.1:8080/ipfs/QmQhUFNnrk1XxFARWMUVnmQ5jW2bdPQmToFgP8QV5uKtM1';
const message_title = 'Message from Gena';

document.addEventListener('DOMContentLoaded', async () => {
  await Notification.requestPermission();

  return showMessage('Ready', 'Gena Notice')
});

function checkIcon() {
  return fetch(icon_path)
    .catch(err => {
      return Promise.reject(
        new Notification('Failed to load icon', {body: 'IPFS not running?'})
      );
    })
}

function showMessage(message: string, title = message_title, icon = icon_path) {
  return checkIcon()
    .then(res => {
      return new Notification(message_title, {
        body: message
        , icon: icon_path
      })
    })
}

setWindowProp('showMessage', showMessage);
