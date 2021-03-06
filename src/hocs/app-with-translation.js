import React from 'react'
import Router from 'next/router'

import { I18nextProvider } from 'react-i18next'
import { lngFromReq, lngPathCorrector } from 'utils'
import { NextStaticProvider } from 'components'

import hoistNonReactStatics from 'hoist-non-react-statics'

export default function (WrappedComponent) {

  const { config, consoleMessage, i18n } = this

  class AppWithTranslation extends React.Component {

    constructor() {
      super()
      if (config.localeSubpaths) {
        i18n.on('languageChanged', (lng) => {
          if (process.browser) {
            const originalRoute = window.location.pathname
            const [href, as] = lngPathCorrector(config, i18n, originalRoute, lng)
            if (as !== originalRoute) {
              Router.replace(href, as, { shallow: true })
            }
          }
        })
      }
    }

    static async getInitialProps(ctx) {

      let wrappedComponentProps = { pageProps: {} }
      if (WrappedComponent.getInitialProps) {
        wrappedComponentProps = await WrappedComponent.getInitialProps(ctx)
      }

      if (config.otherLanguages.length <= 0) {
        consoleMessage(
          'error',
          'To properly initialise a next-i18next instance you must provide one or more locale codes in config.otherLanguages.',
        )
      }

      // Initiate vars to return
      const { req } = ctx.ctx
      let initialI18nStore = {}
      let initialLanguage = null

      // Step 1: Determine initial language
      if (req && req.i18n) {

        initialLanguage = lngFromReq(req)

        // Perform a lang change in case we're not on the right lang
        await i18n.changeLanguage(initialLanguage)

      } else if (Array.isArray(i18n.languages) && i18n.languages.length > 0) {
        initialLanguage = i18n.language
      }

      // Step 2: Determine namespace dependencies
      let namespacesRequired = config.ns
      if (Array.isArray(wrappedComponentProps.pageProps.namespacesRequired)) {
        ({ namespacesRequired } = wrappedComponentProps.pageProps)
      } else {
        consoleMessage(
          'warn',
          `You have not declared a namespacesRequired array on your page-level component: ${ctx.Component.displayName || ctx.Component.name || 'Component'}. This will cause all namespaces to be sent down to the client, possibly negatively impacting the performance of your app. For more info, see: https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies`,
        )
      }

      // We must always send down the defaultNS, otherwise
      // the client will trigger a request for it and issue
      // the "Did not expect server HTML to contain a <h1> in <div>"
      // error
      if (!namespacesRequired.includes(config.defaultNS)) {
        namespacesRequired.push(config.defaultNS)
      }

      // Step 3: Perform data fetching, depending on environment
      if (req && req.i18n) {

        // Initialise the store with only the initialLanguage and
        // necessary namespaces needed to render this specific tree
        const { fallbackLng } = config
        initialI18nStore[initialLanguage] = {}
        if (fallbackLng) {
          initialI18nStore[fallbackLng] = {}
        }
        namespacesRequired.forEach((ns) => {
          initialI18nStore[initialLanguage][ns] = (
            (req.i18n.services.resourceStore.data[initialLanguage] || {})[ns] || {}
          )
          if (fallbackLng) {
            initialI18nStore[fallbackLng][ns] = (
              (req.i18n.services.resourceStore.data[fallbackLng] || {})[ns] || {}
            )
          }
        })

      } else if (Array.isArray(i18n.languages) && i18n.languages.length > 0) {

        // Load newly-required translations if changing route clientside
        await Promise.all(
          namespacesRequired
            .filter(ns => !i18n.hasResourceBundle(i18n.languages[0], ns))
            .map(ns => new Promise(resolve => i18n.loadNamespaces(ns, () => resolve()))),
        )
        initialI18nStore = i18n.store.data

      }

      // `pageProps` will get serialized automatically by NextJs
      return {
        initialI18nStore,
        initialLanguage,
        ...wrappedComponentProps,
      }
    }

    render() {
      let { initialLanguage, initialI18nStore } = this.props
      if (!process.browser) {
        initialLanguage = i18n.language
        initialI18nStore = i18n.store.data
      }
      return (
        <I18nextProvider
          i18n={i18n}
          initialLanguage={initialLanguage}
          initialI18nStore={initialI18nStore}
        >
          <NextStaticProvider>
            <WrappedComponent {...this.props} />
          </NextStaticProvider>
        </I18nextProvider>
      )
    }
  }

  return hoistNonReactStatics(AppWithTranslation, WrappedComponent, { getInitialProps: true })

}
