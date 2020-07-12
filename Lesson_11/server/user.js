/* eslint-disable require-jsdoc */
'use strict';

class User {
  constructor({socket, username= this._randomName(), channel = null}) {
    this._socket = socket;
    this._username = username;
    this._currentChannel = channel;
  }

  set username(name) {
    this._username = name;
  }

  get username() {
    return this._username;
  }

  set socket(socket) {
    this._socket = socket;
  }

  get socket() {
    return this._socket;
  }

  set currentChannel(channel) {
    this._currentChannel = channel;
  }

  get currentChannel() {
    return this._currentChannel;
  }

  sendMessage(message) {
    this._socket.send(message);
  }

  disconect() {
    this.currentChannel.leave(this);
    this._socket.close();
  }

  _randomName() {
    return `anonymous-${Math.floor(Math.random() * Math.floor(100))}`;
  }
}

module.exports = {User};
