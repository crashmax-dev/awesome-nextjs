import Head from 'next/head'
import Header from './header'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-10 mt-10 mb-10 gap-10">
      <Head>
        <title>Next.js Tailwind CSS Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </main>
  )
}