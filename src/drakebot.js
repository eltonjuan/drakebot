import {SLACK_ACCESS_TOKEN} from './config';
import Basebot from './basebot';

export default class Drakebot extends Basebot {
  constructor(token) {
    super(token);
  }
}
