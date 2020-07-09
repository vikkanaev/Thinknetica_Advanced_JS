/* eslint-disable require-jsdoc */
'use strict';

class Channel {
  constructor(name) {
    this.name = name;
    this._clients = new Set();
  }

  get clients() {
    return this._clients;
  }

  join(user) {
    if (user.currentChannel) user.currentChannel.leave(user);

    this._clients.add(user);
    user.currentChannel = this;

    console.log(`User ${user.username} join to '${this.name}' and set user-channel to '${user.currentChannel.name}'`);
    console.log(`${this.name} has ${this._clients.size} clients.`);
  }

  leave(user) {
    this._clients.delete(user);

    console.log(`User ${user.username} leave from ${this.name}.`);
    console.log(`${this.name} has ${this._clients.size} clients.`);
  }
}

module.exports = {Channel};
