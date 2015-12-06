import {SLACK_ACCESS_TOKEN} from './config';
import mongoose from 'mongoose';
import Basebot from './basebot';
import sample from 'lodash.sample';
import DrakeSpeak from './models/DrakeSpeak';


export default class Drakebot extends Basebot {

  constructor(token) {
    super(token);
    mongoose.connect('mongodb://localhost/drakebot');
    this.recall();
  }

  async recall() {
    this.drakespeak = await DrakeSpeak.find();
  }

  onMessage(message) {
    const text = message.text;
    this.msg = message;
    this.speak();

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

  speak() {
    const rand = sample(this.drakespeak).body;
    const cid = sample(this.getChannels()).id;
    const channel = this.getChannel(cid);
    console.log(`drake speaking in: ${channel.name}. says: ${rand}`);
    channel.send(rand);
  }

}
