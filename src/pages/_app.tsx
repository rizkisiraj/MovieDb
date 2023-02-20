import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'


import theme from '../theme'
import { AppProps } from 'next/app'
import { Layout } from '../components/layouts/layout.component'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
