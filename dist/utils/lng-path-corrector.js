"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _default = function _default(config, i18n, currentRoute) {
  var currentLanguage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : i18n.languages[0];
  var defaultLanguage = config.defaultLanguage,
      allLanguages = config.allLanguages;

  if (!allLanguages.includes(currentLanguage)) {
    throw new Error('Invalid configuration: Current language is not included in all languages array');
  }

  var href = currentRoute;
  var as = href;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allLanguages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var lng = _step.value;

      if (href.startsWith("/".concat(lng, "/"))) {
        href = href.replace("/".concat(lng, "/"), '/');
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (currentLanguage !== defaultLanguage) {
    as = "/".concat(currentLanguage).concat(href);
    href += "?lng=".concat(currentLanguage);
  } else {
    as = href;
  }

  return [href, as];
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;