import {SLACK_ACCESS_TOKEN, INTERVAL} from './config';
import mongoose from 'mongoose';
import Basebot from './basebot';
import sample from 'lodash.sample';
import DrakeSpeak from './models/DrakeSpeak';

export default class Drakebot extends Basebot {

  constructor(token) {
    super(token);
    mongoose.connect('mongodb://localhost/drakebot');
    this.boot();
  }

  boot() {
    this.sync();
    this.startTimer();
  }

  async sync() {
    this.drakespeak = await DrakeSpeak.find();
  }

  startTimer() {
    console.info(`DRAKEBOT: Starting timer... Drake speaking every ${INTERVAL} seconds.`);
    process.nextTick(() => {
      setInterval(() => {
        this.preach();
      }, INTERVAL * 1000);
    });
  }

  preach() {
    const text = sample(this.drakespeak).body;
    const dmOrChannel = sample(['dm', 'channel']);
    this.sendMessage(dmOrChannel, text);
  }

  async sendMessage(type, message) {
    if (type === 'channel') {
      const channel = sample(this.getChannels());
      const channelId = channel.id;
      this.bot.say({
        channel: channelId,
        message
      });

    } else {
      const user = sample(this.listUsers());
      this.bot.say({

      });
    }
  }
}
