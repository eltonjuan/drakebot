import {SLACK_ACCESS_TOKEN, WHITELIST, INTERVAL} from './config';
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
    console.info(`Starting timer... drake speaks every ${INTERVAL} seconds.`);
    process.nextTick(() => {
      setInterval(() => {
        this.preach();
      }, INTERVAL * 1000);
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
      this.sync();
      console.info('Added knowledge: ', knowledge);
    });
  }

  getChannels() {
    let channels = this.slack.channels;
    if (WHITELIST) {
      WHITELIST.forEach((name) => {
        Object.keys(channels).forEach((key) => {
          if (channels[key].name !== name) {
            delete channels[key];
          }
        });
      });
    }
    return channels;
  }

  preach() {
    const rand = sample(this.drakespeak).body;
    const cid = sample(this.getChannels()).id;
    const channel = this.getChannel(cid);
    this.joinChannel(channel);
    console.log(`drake speaking in: ${channel.name}. says: ${rand}`);
    channel.send(rand);
  }

  joinChannel(channel) {
    this.slack.joinChannel(channel.name);
  }

}
