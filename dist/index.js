'use strict';

var _config = require('./config');

var _drakebot = require('./drakebot');

var _drakebot2 = _interopRequireDefault(_drakebot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _drakebot2.default(_config.SLACK_ACCESS_TOKEN);