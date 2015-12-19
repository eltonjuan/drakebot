import {DEBUG} from './config';
import Botkit from 'botkit';

export default class BaseBot {

  constructor(token) {
    this.controller = Botkit.slackbot({
      debug: DEBUG
    });
    this.bot = this.controller.spawn({
      token
    }).startRTM();
    this.channels = this.bot.api.channels.list({}, (err, res) => {
      if (err) throw err;
      this.channels = res.channels;
    });
    this.users = this.bot.api.users.list({}, (err, res) => {
      if (err) throw err;
      this.users = res.members.filter((user)=>{
        return !user.is_bot;
      });
    });
  }

  getChannels() {
    return this.channels;
  }

  getChannelsForUser() {
    return this.channels.filter((channel) => {
      return channel.is_member;
    });
  }

  listUsers() {
    return this.users;
  }

}
