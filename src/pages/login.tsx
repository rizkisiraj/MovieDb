import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

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
      <Auth
        redirectTo='http://localhost:3000/'
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    )
}

LoginPage.Layout = (page:any) => page;

export default LoginPage;