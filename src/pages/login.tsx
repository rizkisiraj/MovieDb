import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Flex, useToast } from '@chakra-ui/react'
import { FaGithub } from "react-icons/fa";
import { githubSignIn } from '../utils/supabase/supabase'

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
          <Button colorScheme='teal' display={"flex"} gap="8px" onClick={() => githubSignIn(supabaseClient)}><span><FaGithub fontSize="24px" /></span> <span> Sign In</span></Button>
      </Flex>
    )
}

LoginPage.Layout = (page:any) => page;

export default LoginPage;