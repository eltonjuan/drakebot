'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slackClient = require('slack-client');

var _slackClient2 = _interopRequireDefault(_slackClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Basebot = (function () {
  function Basebot(token) {
    _classCallCheck(this, Basebot);

    this.token = token;
    this.connect();
  }

  _createClass(Basebot, [{
    key: 'connect',
    value: function connect() {
      this.slack = new _slackClient2.default(this.token, true, true);
      this.slack.on('open', this.onOpen.bind(this));
      this.slack.on('error', this.onError.bind(this));
      this.slack.on('message', this.onMessage.bind(this));
      this.slack.login();
    }
  }, {
    key: 'onOpen',
    value: function onOpen() {
      console.log('Connected to ' + this.slack.team.name + ' as: ' + this.slack.self.name);
    }
  }, {
    key: 'onError',
    value: function onError() {}
  }, {
    key: 'onMessage',
    value: function onMessage() {}
  }]);

  return Basebot;
})();

exports.default = Basebot;