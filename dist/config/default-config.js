"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var DEFAULT_LANGUAGE = 'en';
var OTHER_LANGUAGES = [];
var DEFAULT_NAMESPACE = 'common';
var LOCALE_PATH = 'static/locales';
var LOCALE_STRUCTURE = '{{lng}}/{{ns}}';
var LOCALE_SUBPATHS = false;
var _default = {
  defaultLanguage: DEFAULT_LANGUAGE,
  otherLanguages: OTHER_LANGUAGES,
  fallbackLng: process.env.NODE_ENV === 'production' ? DEFAULT_LANGUAGE : null,
  load: 'languageOnly',
  localePath: LOCALE_PATH,
  localeStructure: LOCALE_STRUCTURE,
  localeSubpaths: LOCALE_SUBPATHS,
  ns: [DEFAULT_NAMESPACE],
  use: [],
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: function format(value, _format) {
      return _format === 'uppercase' ? value.toUpperCase() : value;
    }
  },
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  ignoreRoutes: ['/_next', '/static'],
  detection: {
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie']
  },
  backend: {
    loadPath: "/".concat(LOCALE_PATH, "/").concat(LOCALE_STRUCTURE, ".json"),
    addPath: "/".concat(LOCALE_PATH, "/").concat(LOCALE_STRUCTURE, ".missing.json")
  },
  react: {
    wait: true
  },
  strictMode: true,
  errorStackTraceLimit: 0
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;