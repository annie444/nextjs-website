import '../styles/globals.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import HeadComp from './head'
import Layout from './layout'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  return (
    <>
      <HeadComp />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
