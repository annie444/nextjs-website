import '../styles/globals.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import ResumeLayout from '../components/ResumeLayout'
import { MDXProvider } from '@mdx-js/react'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  return (
    <>
      <ChakraProvider>
        <ResumeLayout>
          <MDXProvider>
            <Component {...pageProps} />
          </MDXProvider>
        </ResumeLayout>
      </ChakraProvider>
    </>
  )
}
