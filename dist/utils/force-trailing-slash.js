"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.search");

var _url = require("url");

var _index = require("./index");

var _default = function _default(req, res, next) {
  var _parse = (0, _url.parse)(req.url),
      pathname = _parse.pathname,
      search = _parse.search;

  var performedRedirect = false;
  req.i18n.options.allLanguages.forEach(function (lng) {
    if (pathname === "/".concat(lng)) {
      (0, _index.redirectWithoutCache)(res, pathname.replace("/".concat(lng), "/".concat(lng, "/")) + (search || ''));
      performedRedirect = true;
    }
  });

  if (!performedRedirect) {
    next();
  }
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;