import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, useToast } from '@chakra-ui/react'

const LoginPage = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const toast = useToast();

  useEffect(() => {
    if(user) {
      toast({
        title: `log in success`,
        status: 'success',
        isClosable: true,
      })
      router.push('/');
    }
  },[user])

    return (
      <Flex minH="100vh" w="100%" bgColor={{base: "white" ,sm:"teal.700"}} justifyContent="center" alignItems="center">
        <Box w="100%" bgColor="white" maxW="400px" padding="8" shadow={{base:"none" ,sm:"lg"}}>
          <Auth
            redirectTo='http://localhost:3000/'
            appearance={{style: {
              button: {
                        backgroundColor: '#4FD1C5',
                        outline: 'none',
                        border: 'none'
                      },
              label: {
                        color: '#718096'
                     },
              input: {
                        backgroundColor: '#CBD5E0',
                        outline: 'none',
                        borderRadius: '0px'
                     }
            }}}
            supabaseClient={supabaseClient}
            providers={['google', 'github']}
            socialLayout="horizontal"
          />
        </Box>
      </Flex>
    )
}

LoginPage.Layout = (page:any) => page;

export default LoginPage;