import {SLACK_ACCESS_TOKEN, ADMIN} from './config';
import adminApp from './admin/app';
import Drakebot from './drakebot';


new Drakebot(SLACK_ACCESS_TOKEN);

if (ADMIN) {
  adminApp();
}
