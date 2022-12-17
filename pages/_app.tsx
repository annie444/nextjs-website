import '../styles/globals.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import { Header } from '../components/Head'
import { Layout } from '../components/Layout'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const router = useRouter()

  const lightTheme = createTheme({
    type: 'light', // it could be "light" or "dark"
    className: 'next-ui-light-theme',
    theme: {
      colors: {
        background: 'transparent',
        backgroundAlpha: 'rgba(255, 255, 255, 0.6)', // used for semi-transparent backgrounds like the navbar
        foreground: '#000000',
        backgroundContrast: '#ffffff',
        // brand colors
        primaryLightHover: '#ffafc7', // commonly used on hover state
        primaryLightActive: '#73d7ee', // commonly used on pressed state
        primaryLightContrast: '#6f73d2', // commonly used for text inside the component
        primarySolidContrast: '$white', // commonly used for text inside the component

        text: '#000000',
        neutral: '#000000',
        primary: '#ffafc7',
        secondary: '#73d7ee',
        success: '#6f73d2',
        warning: '#f9dc5c',
        error: '#E28413',
        gradient: 'linear-gradient(112deg, #73d7ee, #ffafc7, #ffffff)',
        link: '',
      },
    },
  })

  const darkTheme = createTheme({
    type: 'dark', // it could be "light" or "dark"
    className: 'next-ui-dark-theme',
    theme: {
      colors: {
        background: 'transparent',
        backgroundAlpha: 'rgba(0, 0, 0, 0.6)', // used for semi-transparent backgrounds like the navbar
        foreground: '#ffffff',
        backgroundContrast: '#000000',
        // brand colors
        primaryLightHover: '#ffafc7', // commonly used on hover state
        primaryLightActive: '#73d7ee', // commonly used on pressed state
        primaryLightContrast: '#ba98d6', // commonly used for text inside the component
        primarySolidContrast: '$black', // commonly used for text inside the component

        text: '#ffffff',
        neutral: '#ffffff',
        primary: '#ffafc7',
        secondary: '#73d7ee',
        success: '#6f73d2',
        warning: '#f9dc5c',
        error: '#E28413',
        gradient: 'linear-gradient(112deg, #73d7ee, #ffafc7, #ffffff)',
        link: '',
      },
    },
  })

  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Header />
          <Layout>
            <Component key={router.asPath} {...pageProps} />
          </Layout>
        </NextUIProvider>
      </ThemeProvider>
    </>
  )
}
