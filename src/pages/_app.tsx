import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import 'swiper/css';


import theme from '../theme'
import { AppProps } from 'next/app'
import { Layout } from '../components/layouts/layout.component'
import { NextPage } from 'next'
import { ScriptProps } from 'next/script'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { supabaseKeyObject } from '../utils/supabase/supabase'

type Page<P = Record<string, never>> = NextPage<P> & {
  Layout: (page: ScriptProps) => JSX.Element;
};



type Props = AppProps & {
  Component: Page;
};
function MyApp({ Component, pageProps }: Props) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient({ supabaseUrl: supabaseKeyObject.supabaseUrl ,supabaseKey: supabaseKeyObject.supabaseAnonKey }))

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
    <ChakraProvider theme={theme}>
      {
        Component.Layout ?
        <Component {...pageProps} /> : 
        <Layout>
          <Component {...pageProps } />
        </Layout>
      }
    </ChakraProvider>
    </SessionContextProvider>
  )
}

export default MyApp;