import '../styles/globals.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import { Head } from '../components/Head'
import { Layout } from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  return (
    <>
      <Head />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
