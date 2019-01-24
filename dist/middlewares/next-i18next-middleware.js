"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.constructor");

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _utils = require("../utils");

var _url = require("url");

function _default(nexti18next, app, server) {
  var config = nexti18next.config,
      i18n = nexti18next.i18n;
  var allLanguages = config.allLanguages,
      ignoreRoutes = config.ignoreRoutes,
      localeSubpaths = config.localeSubpaths;
  var ignoreRegex = new RegExp("^/(?!".concat(ignoreRoutes.map(function (x) {
    return x.replace('/', '');
  }).join('|'), ").*$"));

  if (!config.serverLanguageDetection) {
    server.get(ignoreRegex, function (req, res, next) {
      req.lng = config.defaultLanguage;
      next();
    });
  }

  server.use(_i18nextExpressMiddleware.default.handle(i18n, {
    ignoreRoutes: ignoreRoutes
  }));

  if (localeSubpaths) {
    server.get(ignoreRegex, _utils.forceTrailingSlash);
    server.get(ignoreRegex, _utils.lngPathDetector);
    server.get("/:lng(".concat(allLanguages.join('|'), ")/*"), function (req, res) {
      var lng = req.params.lng;
      var query = req.query;
      var url = (0, _url.parse)(req.url).pathname;
      app.render(req, res, url.replace("/".concat(lng), ''), (0, _objectSpread2.default)({
        lng: lng
      }, query));
    });
  }
}

module.exports = exports.default;
module.exports.default = exports.default;