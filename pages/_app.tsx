import '../styles/globals.scss'
import React from 'react';
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
	// Use the layout defined at the page level, if available

	return (
		<>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	)
}
