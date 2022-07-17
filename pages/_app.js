import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.min.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../src/reducers'

import { VoiceProvider } from '@/context/voice-context'

import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

// store
const store = createStore(rootReducer)

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Ccommerce - Tienda online</title>
      </Head>
      <Provider store={store}>
        <VoiceProvider>
          <Component {...pageProps} />
        </VoiceProvider>
      </Provider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
