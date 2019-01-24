"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.find");

var _default = function _default(req) {
  var _req$i18n$options = req.i18n.options,
      allLanguages = _req$i18n$options.allLanguages,
      defaultLanguage = _req$i18n$options.defaultLanguage,
      fallbackLng = _req$i18n$options.fallbackLng;
  var language = req.i18n.languages.find(function (l) {
    return allLanguages.includes(l);
  }) || fallbackLng || defaultLanguage;
  return language;
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;