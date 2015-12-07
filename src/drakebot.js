import {SLACK_ACCESS_TOKEN} from './config';
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

  async boot() {
    this.drakespeak = await DrakeSpeak.find();
    this.startTimer();
    console.log('done booting')

  }

  startTimer() {
    process.nextTick(() => {
      setInterval(() => {
        this.preach();
      }, 5000);
    });
  }

  onMessage(message) {
    const text = message.text;
    this.msg = message;

    if (text.substr(0,3) === 'add') {
      const knowledge = text.substr(3, text.length).trim();
      if (knowledge) {
        this.learn(knowledge);
      }
    }
  }

  learn(words) {
    const knowledge = new DrakeSpeak({body: words, userID: this.msg.user});
    knowledge.save(err => {
      if (err) throw err;
      console.info('Added knowledge: ', knowledge);
    });
  }

  preach() {
    const rand = sample(this.drakespeak).body;
    const cid = sample(this.getChannels()).id;
    const channel = this.getChannel(cid);
    this.joinChannel(channel);
    console.log(`drake speaking in: ${channel.name}. says: ${rand}`);
    channel.send(rand);
    this.leaveChannel(channel);
  }

  joinChannel(channel) {
    this.slack.joinChannel(channel.name);
  }

  leaveChannel(channel) {
    this.slack._apiCall('channels.leave', channel.id);
  }

}
