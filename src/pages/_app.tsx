import { NextIntlProvider } from 'next-intl'
import NextApp from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import React from 'react'
import { createCtx } from '@reatom/framework'
import { connectLogger } from '@reatom/framework'
import { reatomContext as Reatom } from '@reatom/npm-react'
import { ColorSchemeProvider } from '@/components/ColorScheme/ColorSchemeProvider'
import { Layout } from '@/components/Layout'
import {
  CookieProvider,
  createCookieClient,
  createCookieServer
} from '@/libs/cookie'
import { isDev, isServer } from '@/utils/constants'
import type { AppContext, AppProps } from 'next/app'

const reatomContext = createCtx()
connectLogger(reatomContext)

interface PageProps {
  i18n: IntlMessages
}

interface Props extends AppProps<PageProps> {
  cookieContext: ReturnType<typeof createCookieServer>
}

export default function App(props: Props) {
  const { Component, pageProps } = props

  const cookieContext = useMemo(
    () => (isServer() ? props.cookieContext : createCookieClient()),
    [props.cookieContext]
  )

  return (
    <>
      <Head>
        <title>Next.js</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <CookieProvider value={cookieContext}>
        <Reatom.Provider value={reatomContext}>
          <NextIntlProvider messages={pageProps.i18n}>
            <ColorSchemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ColorSchemeProvider>
          </NextIntlProvider>
        </Reatom.Provider>
      </CookieProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const pageProps = await NextApp.getInitialProps(appContext)

  if (isServer()) {
    const req = appContext.ctx.req!
    const res = appContext.ctx.res!
    const cookieContext = createCookieServer({ req, res })
    return { ...pageProps, cookieContext }
  }

  return { ...pageProps }
}
