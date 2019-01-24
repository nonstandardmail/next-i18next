"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defaultConfig = _interopRequireDefault(require("./default-config"));

var _detectNode = _interopRequireDefault(require("detect-node"));

var _default = function _default(userConfig) {
  var combinedConfig = (0, _objectSpread2.default)({}, _defaultConfig.default, userConfig);
  combinedConfig.allLanguages = combinedConfig.otherLanguages.concat([combinedConfig.defaultLanguage]);
  combinedConfig.ns = [combinedConfig.defaultNS];

  if (_detectNode.default && !process.browser) {
    var fs = eval("require('fs')");

    var path = require('path');

    var getAllNamespaces = function getAllNamespaces(p) {
      return fs.readdirSync(p).map(function (file) {
        return file.replace('.json', '');
      });
    };

    var _combinedConfig = combinedConfig,
        allLanguages = _combinedConfig.allLanguages,
        defaultLanguage = _combinedConfig.defaultLanguage,
        localePath = _combinedConfig.localePath,
        localeStructure = _combinedConfig.localeStructure;
    combinedConfig = (0, _objectSpread2.default)({}, combinedConfig, {
      preload: allLanguages,
      ns: getAllNamespaces(path.join(process.cwd(), "".concat(localePath, "/").concat(defaultLanguage))),
      backend: {
        loadPath: path.join(process.cwd(), "".concat(localePath, "/").concat(localeStructure, ".json")),
        addPath: path.join(process.cwd(), "".concat(localePath, "/").concat(localeStructure, ".missing.json"))
      }
    });
  }

  return combinedConfig;
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;