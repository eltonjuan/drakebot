import {DEBUG} from './config';
import Botkit from 'botkit';

export default class BaseBot {

  constructor(token) {
    this.controller = Botkit.slackbot(DEBUG);
    this.controller.spawn({
      token
    }).startRTM();
    this.controller.hears('hello', 'direct_message, direct_mention, mention', (bot, msg) => {
      bot.reply(msg, "hello yourself");
    });
  }



}
