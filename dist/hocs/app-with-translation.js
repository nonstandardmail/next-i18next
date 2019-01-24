"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.regexp.replace");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _router = _interopRequireDefault(require("next/router"));

var _reactI18next = require("react-i18next");

var _utils = require("../utils");

var _components = require("../components");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

function _default(WrappedComponent) {
  var config = this.config,
      consoleMessage = this.consoleMessage,
      i18n = this.i18n;

  var AppWithTranslation =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(AppWithTranslation, _React$Component);

    function AppWithTranslation() {
      var _this;

      (0, _classCallCheck2.default)(this, AppWithTranslation);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AppWithTranslation).call(this));

      if (config.localeSubpaths) {
        i18n.on('languageChanged', function (lng) {
          if (process.browser) {
            var originalRoute = window.location.pathname;

            var _lngPathCorrector = (0, _utils.lngPathCorrector)(config, i18n, originalRoute, lng),
                _lngPathCorrector2 = (0, _slicedToArray2.default)(_lngPathCorrector, 2),
                href = _lngPathCorrector2[0],
                as = _lngPathCorrector2[1];

            if (as !== originalRoute) {
              _router.default.replace(href, as, {
                shallow: true
              });
            }
          }
        });
      }

      return _this;
    }

    (0, _createClass2.default)(AppWithTranslation, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            initialLanguage = _this$props.initialLanguage,
            initialI18nStore = _this$props.initialI18nStore;

        if (!process.browser) {
          initialLanguage = i18n.language;
          initialI18nStore = i18n.store.data;
        }

        return _react.default.createElement(_reactI18next.I18nextProvider, {
          i18n: i18n,
          initialLanguage: initialLanguage,
          initialI18nStore: initialI18nStore
        }, _react.default.createElement(_components.NextStaticProvider, null, _react.default.createElement(WrappedComponent, this.props)));
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(ctx) {
          var wrappedComponentProps, req, initialI18nStore, initialLanguage, namespacesRequired, fallbackLng;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  wrappedComponentProps = {
                    pageProps: {}
                  };

                  if (!WrappedComponent.getInitialProps) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 4;
                  return WrappedComponent.getInitialProps(ctx);

                case 4:
                  wrappedComponentProps = _context.sent;

                case 5:
                  if (config.otherLanguages.length <= 0) {
                    consoleMessage('error', 'To properly initialise a next-i18next instance you must provide one or more locale codes in config.otherLanguages.');
                  } // Initiate vars to return


                  req = ctx.ctx.req;
                  initialI18nStore = {};
                  initialLanguage = null; // Step 1: Determine initial language

                  if (!(req && req.i18n)) {
                    _context.next = 15;
                    break;
                  }

                  initialLanguage = (0, _utils.lngFromReq)(req); // Perform a lang change in case we're not on the right lang

                  _context.next = 13;
                  return i18n.changeLanguage(initialLanguage);

                case 13:
                  _context.next = 16;
                  break;

                case 15:
                  if (Array.isArray(i18n.languages) && i18n.languages.length > 0) {
                    initialLanguage = i18n.language;
                  }

                case 16:
                  // Step 2: Determine namespace dependencies
                  namespacesRequired = config.ns;

                  if (Array.isArray(wrappedComponentProps.pageProps.namespacesRequired)) {
                    namespacesRequired = wrappedComponentProps.pageProps.namespacesRequired;
                  } else {
                    consoleMessage('warn', "You have not declared a namespacesRequired array on your page-level component: ".concat(ctx.Component.displayName || ctx.Component.name || 'Component', ". This will cause all namespaces to be sent down to the client, possibly negatively impacting the performance of your app. For more info, see: https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies"));
                  } // We must always send down the defaultNS, otherwise
                  // the client will trigger a request for it and issue
                  // the "Did not expect server HTML to contain a <h1> in <div>"
                  // error


                  if (!namespacesRequired.includes(config.defaultNS)) {
                    namespacesRequired.push(config.defaultNS);
                  } // Step 3: Perform data fetching, depending on environment


                  if (!(req && req.i18n)) {
                    _context.next = 26;
                    break;
                  }

                  // Initialise the store with only the initialLanguage and
                  // necessary namespaces needed to render this specific tree
                  fallbackLng = config.fallbackLng;
                  initialI18nStore[initialLanguage] = {};

                  if (fallbackLng) {
                    initialI18nStore[fallbackLng] = {};
                  }

                  namespacesRequired.forEach(function (ns) {
                    initialI18nStore[initialLanguage][ns] = (req.i18n.services.resourceStore.data[initialLanguage] || {})[ns] || {};

                    if (fallbackLng) {
                      initialI18nStore[fallbackLng][ns] = (req.i18n.services.resourceStore.data[fallbackLng] || {})[ns] || {};
                    }
                  });
                  _context.next = 30;
                  break;

                case 26:
                  if (!(Array.isArray(i18n.languages) && i18n.languages.length > 0)) {
                    _context.next = 30;
                    break;
                  }

                  _context.next = 29;
                  return Promise.all(namespacesRequired.filter(function (ns) {
                    return !i18n.hasResourceBundle(i18n.languages[0], ns);
                  }).map(function (ns) {
                    return new Promise(function (resolve) {
                      return i18n.loadNamespaces(ns, function () {
                        return resolve();
                      });
                    });
                  }));

                case 29:
                  initialI18nStore = i18n.store.data;

                case 30:
                  return _context.abrupt("return", (0, _objectSpread2.default)({
                    initialI18nStore: initialI18nStore,
                    initialLanguage: initialLanguage
                  }, wrappedComponentProps));

                case 31:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);
    return AppWithTranslation;
  }(_react.default.Component);

  return (0, _hoistNonReactStatics.default)(AppWithTranslation, WrappedComponent, {
    getInitialProps: true
  });
}

module.exports = exports.default;
module.exports.default = exports.default;