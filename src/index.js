import {SLACK_ACCESS_TOKEN, VIEWER_ENABLED} from './config';
import boot from './viewer/Viewer';
import Drakebot from './drakebot';


new Drakebot(SLACK_ACCESS_TOKEN);

if (VIEWER_ENABLED) {
  boot();
}
