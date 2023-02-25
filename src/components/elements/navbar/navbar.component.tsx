import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { MdOutlineFavorite, MdMovieCreation } from 'react-icons/md'
import { Flex, Heading, Input, InputGroup, InputRightElement, Box, Link, MenuButton, Menu, IconButton, Icon, MenuList, MenuItem, HStack, useColorMode, Tooltip, Switch, Button, useToast } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { signOutUser } from "../../../utils/supabase/supabase";
import { useState } from "react";

export const Navbar:React.FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const toast = useToast();
  const currentRoute = router.pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSigningOut, SetSigningOut] = useState(false);
    return (     
      <Box as="header" paddingX={16} paddingTop={4} marginBottom="48px">
        <Flex alignItems="center" justifyContent="space-between" marginBottom={4}>
          <Heading translate="no" as="h1" size="md" colorScheme="teal">MovieDb</Heading>
          <InputGroup maxW='50%'>  
            <Input variant='filled' placeholder='Search...' focusBorderColor="teal.500" />
            <InputRightElement children={<Search2Icon color='gray.500' />} />
          </InputGroup>
          <HStack>
            <Switch mr="16px" colorScheme="teal" onChange={toggleColorMode} isChecked={colorMode === 'light' ? false : true} />
            <Box display={{base: 'none', lg: 'block'}}>
            <Tooltip label="Favorite">
              <IconButton aria-label="favorite movie link" as={NextLink} href="/favorite-movie" variant="ghost" colorScheme="teal" icon={<Icon as={MdOutlineFavorite} />} />
            </Tooltip>
            <Tooltip label="Watchlist">
              <IconButton aria-label="favorite movie link" as={NextLink} href="/" variant="ghost" colorScheme="teal" icon={<Icon as={MdMovieCreation} />} />
            </Tooltip>
            </Box>
            {
              user ? <Button disabled={isSigningOut} colorScheme="teal" variant="solid" onClick={() => {
                SetSigningOut(true);
                signOutUser(supabaseClient);
                toast({
                  title: `log out success`,
                  status: 'success',
                  isClosable: true,
                })
              }} >{isSigningOut ? 'Signing out...' : 'Sign Out'}</Button> :
              <Button as={NextLink} colorScheme="teal" variant="solid" href="/login">Sign In</Button>
            }
          </HStack>
        </Flex>
        <Flex as="nav" justifyContent="center" gap={8}>
          <Link fontWeight="500" textDecor={currentRoute === '/' ? 'underline' : 'none'} href="/" as={NextLink} color={currentRoute === '/' ? 'teal.300' : 'GrayText'}>Home</Link>
          <Link fontWeight="500" textDecor={currentRoute === '/popular-movies' ? 'underline' : 'none'} href="/popular-movies" as={NextLink} color={currentRoute === '/popular-movies' ? 'teal.300' : 'GrayText'}>Popular Movies</Link>
          <Link fontWeight="500" textDecor={currentRoute === '/upcoming-movies' ? 'underline' : 'none'} href="/upcoming-movies" as={NextLink} color={currentRoute === '/upcoming-movies' ? 'teal.300' : 'GrayText'}>Upcoming Movies</Link>
          <Menu>
            <MenuButton as="button" style={{color: "GrayText"}}>
              Category <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Biography</MenuItem>
              <MenuItem color="GrayText">Fiction</MenuItem>
              <MenuItem color="GrayText">Self Improvement</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    )
}