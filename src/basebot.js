import { DEBUG, USER_WHITELIST, CHANNEL_WHITELIST } from './config';
import Botkit from 'botkit';

export default class BaseBot {

  constructor(token) {
    this.controller = Botkit.slackbot({
      debug: DEBUG,
    });
    this.bot = this.controller.spawn({
      token,
    }).startRTM();
    this.channels = this.bot.api.channels.list({}, (err, res) => {
      if (err) {
        throw err;
      }
      this.channels = res.channels;
      if (CHANNEL_WHITELIST) {
        this.channels = this.channels.filter(channel => CHANNEL_WHITELIST.includes(channel.name));
      }
    });
    this.users = this.bot.api.users.list({}, (err, res) => {
      if (err) {
        throw err;
      }
      this.users = res.members.filter(user => !user.is_bot);
      if (USER_WHITELIST) {
        this.users = this.users.filter(user => USER_WHITELIST.includes(user.name));
      }
    });
  }

  getChannels() {
    return this.channels;
  }

  getChannelsForUser() {
    return this.channels.filter(channel => channel.is_member);
  }

  listUsers() {
    return this.users;
  }
}
