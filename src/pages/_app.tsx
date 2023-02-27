import NextApp, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { createCtx } from '@reatom/core'
import { connectLogger } from '@reatom/framework'
import { reatomContext as Reatom } from '@reatom/npm-react'
import { getCookie, setCookie } from 'cookies-next'

const ctx = createCtx()
connectLogger(ctx)

interface Props extends AppProps {
  colorScheme: ColorScheme
}

export default function App(props: Props) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme): void => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookie('color_scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  return (
    <>
      <Head>
        <title>Next.js</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Reatom.Provider value={ctx}>
            <Component {...pageProps} />
          </Reatom.Provider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)

  return {
    ...appProps,
    colorScheme: getCookie('color_scheme', appContext.ctx) ?? 'dark'
  }
}
