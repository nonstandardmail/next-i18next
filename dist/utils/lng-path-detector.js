"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/web.dom.iterable");

var _index = require("./index");

var _default = function _default(req, res, next) {
  if (req.i18n) {
    var language = (0, _index.lngFromReq)(req);
    var _req$i18n$options = req.i18n.options,
        allLanguages = _req$i18n$options.allLanguages,
        defaultLanguage = _req$i18n$options.defaultLanguage;
    var languageChanged = false;
    /*
      If a user has hit a subpath which does not
      match their language, give preference to
      the path, and change user language.
    */

    allLanguages.forEach(function (lng) {
      if (req.url.startsWith("/".concat(lng, "/")) && language !== lng) {
        req.i18n.changeLanguage(lng);
        languageChanged = true;
      }
    });
    /*
      If a user has hit the root path and their
      language is not set to default, give
      preference to the language and redirect
      their path.
    */

    if (!languageChanged && language !== defaultLanguage && !req.url.startsWith("/".concat(language, "/"))) {
      allLanguages.forEach(function (lng) {
        if (req.url.startsWith("/".concat(lng, "/"))) {
          req.url = req.url.replace("/".concat(lng, "/"), '/');
        }
      });
      (0, _index.redirectWithoutCache)(res, req.url.replace('/', "/".concat(language, "/")));
    }
    /*
      If a user has a default language prefix
      in their URL, strip it.
    */


    if (language === defaultLanguage && req.url.startsWith("/".concat(defaultLanguage, "/"))) {
      (0, _index.redirectWithoutCache)(res, req.url.replace("/".concat(defaultLanguage, "/"), '/'));
    }
  }

  next();
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;