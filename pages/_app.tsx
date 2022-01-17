import { SWRConfig } from 'swr'
import fetcher from 'lib/fetcher'
import { VechaiProvider } from '@vechaiui/react'
import type { AppProps } from 'next/app'
import 'styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => {
          console.error(err)
        }
      }}
    >
      <VechaiProvider>
        <Component {...pageProps} />
      </VechaiProvider>
    </SWRConfig>
  )
}
