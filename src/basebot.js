import Slack from 'slack-client';

export default class Basebot {

  constructor(token) {
    this.token = token;
    this.connect();
  }

  connect() {
    this.slack = new Slack(this.token, true, true);
    this.slack.on('open', this.onOpen.bind(this));
    this.slack.on('error', this.onError.bind(this));
    this.slack.on('message', this.onMessage.bind(this));
    this.slack.login();
  }

  getChannels() {
    return this.slack.channels;
  }

  getChannel(id) {
    return this.slack.getChannelGroupOrDMByID(id);
  }

  onOpen() {
    console.log(`Connected to ${this.slack.team.name} as: ${this.slack.self.name}`);
  }

  onError() {

  }

  sendMessage(message, channel = this.slack.channel) {

  }

  onMessage() {

  }



}
