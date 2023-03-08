import { ChevronDownIcon, HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { MdOutlineFavorite, MdMovieCreation } from 'react-icons/md'
import { Flex, Heading, Input, InputGroup, InputRightElement, Box, Link, MenuButton, Menu, IconButton, Icon, MenuList, MenuItem, HStack, useColorMode, Tooltip, Switch, Button, useToast, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useMediaQuery } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { signOutUser } from "../../../utils/supabase/supabase";
import { useState } from "react";
import SearchModal from "../search-modal/search-modal.component";

export const Navbar:React.FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const toast = useToast();
  const currentRoute = router.pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSigningOut, SetSigningOut] = useState(false);
  const { isOpen:isModalOpen, onClose:onModalClose, onOpen:onModalOpen } = useDisclosure();
  const { isOpen:isDrawerOpen, onClose:onDrawerClose, onOpen:onDrawerOpen, onToggle } = useDisclosure();
  const [isSmallScreen] = useMediaQuery('(max-width: 830px)');

    return (
      <>
      <Box as="header" paddingX={{base: 4, md:16}} paddingTop={4} marginBottom="48px">
        <Flex alignItems="center" justifyContent="space-between" marginBottom={4}>
          <Heading translate="no" as="h1" size="md" colorScheme="teal">MovieDb</Heading>
          <Box
            as="button"
            width="50%"
            height="40px"
            shadow="base"
            rounded="md"
            display={{base: 'none', md: 'flex'}}
            alignItems="center"
            paddingX="3"
            _focus={{
              shadow: "outline"
            }}
            _dark={{
              color:"GrayText",
              bgColor: "gray.700",
            }}
            color="GrayText"
            onClick={onModalOpen}
          >
            <Search2Icon />
            <Text ml="4">Search movie...</Text>
          </Box>
          <HStack display={{base: 'flex', md: 'none'}}>
            <IconButton colorScheme="teal" variant="solid" onClick={onModalOpen} aria-label="menu button" icon={<Search2Icon />} />
            <IconButton variant="solid" onClick={onDrawerOpen} aria-label="menu button" icon={<HamburgerIcon />} />
          </HStack>

          <HStack display={{base: 'none', md: 'flex'}}>
            <Switch mr="16px" colorScheme="teal" onChange={toggleColorMode} isChecked={colorMode === 'light' ? false : true} />
            <Box display={{base: 'none', lg: 'block'}}>
              {
                user &&
                (
                  <>
                  <Tooltip label="Favorite">
                    <IconButton aria-label="favorite movie link" as={NextLink} href="/favorite-movie" variant="ghost" colorScheme="teal" icon={<Icon as={MdOutlineFavorite} />} />
                  </Tooltip>
                  <Tooltip label="Watchlist">
                    <IconButton aria-label="favorite movie link" as={NextLink} href="/watchlist-movies" variant="ghost" colorScheme="teal" icon={<Icon as={MdMovieCreation} />} />
                  </Tooltip>
                  </>
                ) 
              }
            </Box>
            {
              user ? <Button  disabled={isSigningOut} colorScheme="teal" variant="solid" onClick={() => {
                SetSigningOut(true);
                signOutUser(supabaseClient);
                toast({
                  title: `log out success`,
                  status: 'success',
                  isClosable: true,
                })
              }} >{isSigningOut ? 'Signing out...' : 'Sign Out'}</Button> :
              <Button  as={NextLink} colorScheme="teal" variant="solid" href="/login">Sign In</Button>
            }
          </HStack>
        </Flex>
        <Flex display={{base: 'none', md: 'flex'}} as="nav" justifyContent="center" gap={8}>
          <Link fontWeight="500" textDecor={currentRoute === '/' ? 'underline' : 'none'} href="/" as={NextLink} color={currentRoute === '/' ? 'teal.300' : 'GrayText'}>Home</Link>
          <Link fontWeight="500" textDecor={currentRoute === '/popular-movies' ? 'underline' : 'none'} href="/popular-movies" as={NextLink} color={currentRoute === '/popular-movies' ? 'teal.300' : 'GrayText'}>Popular Movies</Link>
          <Link fontWeight="500" textDecor={currentRoute === '/upcoming-movies' ? 'underline' : 'none'} href="/upcoming-movies" as={NextLink} color={currentRoute === '/upcoming-movies' ? 'teal.300' : 'GrayText'}>Upcoming Movies</Link>
        </Flex>
      </Box>
      {
        isSmallScreen &&
      <Drawer placement="right" onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Drawer  <Switch mr="16px" colorScheme="teal" onChange={toggleColorMode} isChecked={colorMode === 'light' ? false : true} />
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" justifyContent="space-between" h="100%" py="4">
              <Box>
               <Link onClick={onDrawerClose} display="block" mb="4" fontWeight="500" textDecor={currentRoute === '/' ? 'underline' : 'none'} href="/" as={NextLink} color={currentRoute === '/' ? 'teal.300' : 'blackAlpha.800'}>Home</Link>
               <Link onClick={onDrawerClose} display="block" mb="4" fontWeight="500" textDecor={currentRoute === '/popular-movies' ? 'underline' : 'none'} href="/popular-movies" as={NextLink} color={currentRoute === '/popular-movies' ? 'teal.300' : 'blackAlpha.800'}>Popular Movies</Link>
               <Link onClick={onDrawerClose} display="block" mb="4" fontWeight="500" textDecor={currentRoute === '/upcoming-movies' ? 'underline' : 'none'} href="/upcoming-movies" as={NextLink} color={currentRoute === '/upcoming-movies' ? 'teal.300' : 'blackAlpha.800'}>Upcoming Movies</Link>
               {
                user &&
                (
                  <>
                  <Link onClick={onDrawerClose} display="block" mb="4" fontWeight="500" textDecor={currentRoute === '/favorite-movie' ? 'underline' : 'none'} href="/favorite-movie" as={NextLink} color={currentRoute === '/favorite-movie' ? 'teal.300' : 'blackAlpha.800'}>Favorite Movies</Link>
               <Link onClick={onDrawerClose} display="block" fontWeight="500" textDecor={currentRoute === '/watchlist-movies' ? 'underline' : 'none'} href="/watchlist-movies" as={NextLink} color={currentRoute === '/watchlist-movies' ? 'teal.300' : 'blackAlpha.800'}>Watchlist Movies</Link>
                  </>
                ) 
              }
              </Box>
              {
              user ? <Button  disabled={isSigningOut} colorScheme="teal" variant="solid" onClick={() => {
                SetSigningOut(true);
                signOutUser(supabaseClient);
                onToggle();
                toast({
                  title: `log out success`,
                  status: 'success',
                  isClosable: true,
                })
              }} >{isSigningOut ? 'Signing out...' : 'Sign Out'}</Button> :
              <Button  as={NextLink} colorScheme="teal" variant="solid" href="/login">Sign In</Button>
            }
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      }
      <SearchModal isOpen={isModalOpen} onClose={onModalClose} />
      </>
    )
}