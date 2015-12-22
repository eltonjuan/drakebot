import mongoose from 'mongoose';
import Basebot from './basebot';
import Timer from './timer';
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
    this.timer = new Timer(this.preach.bind(this));
  }

  async sync() {
    this.drakespeak = await DrakeSpeak.find();
  }

  preach() {
    const text = sample(this.drakespeak).quote;
    const dmOrChannel = sample(['dm', 'channel']);
    this.sendMessage(dmOrChannel, text);
  }

  async sendMessage(type, message) {
    if (type === 'channel') {
      const channel = sample(this.getChannelsForUser());
      const channelId = channel.id;
      this.bot.api.chat.postMessage({
        channel: channelId,
        as_user: true,
        text: message,
      });
      console.log(`CHANNEL (${channel.name}): Drakebot says "${message}"`);
    } else {
      const user = sample(this.listUsers());
      this.bot.api.im.open({ user: user.id }, (err, res) => {
        if (err) {
          console.log(err);
        }
        this.bot.api.chat.postMessage({
          channel: res.channel.id,
          as_user: true,
          text: message,
        });
        console.log(`DM (${user.name}): Drakebot says "${message}"`);
      });
    }
  }
}
