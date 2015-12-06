import {SLACK_ACCESS_TOKEN} from './config';
import mongoose from 'mongoose';
import Basebot from './basebot';
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
      console.info('Added knowledge: ', knowledge);
      if (err) throw err;
    });
  }

}
