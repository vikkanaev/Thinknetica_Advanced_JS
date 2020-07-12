'use strict';

/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
class WsClient {
  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');
    this._setupClient(this.socket);
  }

  _setupClient(socket) {
    socket.onopen = (event) => {
      console.log('Connection established', event);
      console.log(`Chat usage:
        // eslint-disable-next-line max-len
        * client.login([user_name], [channel_name]) - change your nick-name to 'user_name' and/or login you to 'channel_name'
        * client.sendMessage(message, [channel_name]) - send 'message' to 'channel_name' if present or to current_channel
        * client.logout() - logout from current channel and join to 'default' channel
        * clieny.exitChat() - leave chat server
      `);
    };

    socket.onmessage = (event) => {
      console.log(`${this._timeStamp()}> ${event.data}`);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Closed correct', event.code);
      } else {
        console.log('Closed wrong', event.code);
      }
    };
  }

  login({username=null, channel=null}) {
    const msg = {
      command: 'login',
      channel: channel,
      username: username};
    this.socket.send(JSON.stringify(msg));
  };

  sendMessage(text, channel=null) {
    const msg = {
      command: 'sendMessage',
      channel: channel,
      message: text};
    this.socket.send(JSON.stringify(msg));
  }

  logout() {
    const msg = {
      command: 'logout',
    };
    this.socket.send(JSON.stringify(msg));
  }

  exitChat() {
    const msg = {
      command: 'exitChat',
    };
    this.socket.send(JSON.stringify(msg));
  };

  _timeStamp() {
    const dateTimeFormat = new Intl.DateTimeFormat('en',
        {year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric'});
    return dateTimeFormat.format(new Date());
  }
}

