/* eslint-disable require-jsdoc */
'use strict';

const WebSocket = require('ws');
const {User} = require('./user.js');
const {Channel} = require('./channel.js');

class WsServer {
  constructor() {
    this._clients = new Set();
    this._channels = new Set();
    this._channels.add(new Channel('default'));
    this._wsConnection = new WebSocket.Server({port: 8080});
    this._sayHi();
  }

  run() {
    this._wsConnection.on('connection', (ws) => {
      const currentUser = this._createNewUser(ws);

      ws.on('message', function(message) {
        const data = JSON.parse(message);

        switch (data.command) {
          case 'login':
            this._handleLoginEvent(data.username, data.channel, currentUser);
            break;

          case 'sendMessage':
            this._handleSendMessageEvent(data.channel, data.message, currentUser);
            break;

          case 'logout':
            this._handleLogoutEvent(currentUser);
            break;

          case 'exitChat':
            this._handleExitChatEvent(currentUser);
            break;

          default:
            break;
        }
      }.bind(this));
    });
  };

  _createNewUser(socket) {
    const defaultChannel = this._findChannelByName('default');
    const user = new User({socket: socket});
    this._clients.add(user);
    defaultChannel.join(user);
    return user;
  }

  _handleLoginEvent(username, channelName, user) {
    if (username) user.username = username;
    if (channelName) {
      const newChannel = this._findOrCreateChannel(channelName);
      newChannel.join(user);
      user.sendMessage(`You enter to channel '${user.currentChannel.name}'`);
    }
  }

  _handleSendMessageEvent(channelName, message, user) {
    const targetChannel = channelName ? this._findChannelByName(channelName) : user.currentChannel;

    this._sendMessageToClients({
      clients: targetChannel.clients,
      message: message,
      channelName: targetChannel.name,
      senderUser: user});
  }

  _handleLogoutEvent(user) {
    const defaultChannel = this._findChannelByName('default');
    const abandonedChannel = user.currentChannel;
    defaultChannel.join(user);

    this._sendMessageToClients({
      clients: abandonedChannel.clients,
      message: `User '${user.username}' left channel ${abandonedChannel.name}.`,
      channelName: abandonedChannel.name});
  }

  _handleExitChatEvent(user) {
    const loggedOutUserName = user.username;
    user.disconect();
    this._clients.delete(user);

    this._sendMessageToClients({
      clients: this._clients,
      message: `User '${loggedOutUserName}' left all channels and chat.`,
      channelName: 'All'});
  }

  _findOrCreateChannel(name) {
    const foundChannel = this._findChannelByName(name);
    if (foundChannel) return foundChannel;

    const newChannel = new Channel(name);
    this._channels.add(newChannel);
    return newChannel;
  }

  _sendMessageToClients({clients, message, channelName, senderUser=null}) {
    if (clients.length === 0) return;

    const senderName = senderUser ? senderUser.username : 'ChatBot';
    const outputPackage = {
      channel: channelName,
      username: senderName,
      message: message,
    };

    for (const client of clients) {
      if (client !== senderUser) client.sendMessage(JSON.stringify(outputPackage));
    }
  }

  _findUserBySocket(socket, clients = this._clients) {
    for (const user of clients) {
      if (user.socket === socket) {
        return user;
        break;
      }
    }
  }

  _findChannelByName(name, channels = this._channels) {
    for (const channel of channels) {
      if (channel.name === name) {
        return channel;
        break;
      }
    }
  }

  _sayHi() {
    console.log('Hi! Server is started and listening!');
  }
};

module.exports = {WsServer};
