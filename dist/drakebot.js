'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _basebot = require('./basebot');

var _basebot2 = _interopRequireDefault(_basebot);

var _DrakeSpeak = require('./models/DrakeSpeak');

var _DrakeSpeak2 = _interopRequireDefault(_DrakeSpeak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drakebot = (function (_Basebot) {
  _inherits(Drakebot, _Basebot);

  function Drakebot(token) {
    _classCallCheck(this, Drakebot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Drakebot).call(this, token));

    _this.drakespeak = _this.recall();
    return _this;
  }

  _createClass(Drakebot, [{
    key: 'recall',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _DrakeSpeak2.default.find({});

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function recall() {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'onMessage',
    value: function onMessage(message) {
      var text = message.text;
      this.msg = message;
      if (text.substr(0, 3) === 'add') {
        var knowledge = text.substr(3, text.length).trim();
        if (knowledge) {
          this.learn(knowledge);
        }
      }
    }
  }, {
    key: 'learn',
    value: function learn(words) {
      var knowledge = new _DrakeSpeak2.default({ body: words, userID: this.msg.user });
      knowledge.save(function (err) {
        if (err) throw err;
      });
    }
  }]);

  return Drakebot;
})(_basebot2.default);

exports.default = Drakebot;