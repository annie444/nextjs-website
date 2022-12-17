import '../styles/globals.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import { Header } from '../components/Head'
import { Layout } from '../components/Layout'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const router = useRouter()

  return (
    <>
      <NextUIProvider>
        <Header />
        <Layout>
          <Component key={router.asPath} {...pageProps} />
        </Layout>
      </NextUIProvider>
    </>
  )
}
