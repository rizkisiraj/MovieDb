import { ChevronDownIcon, MoonIcon, Search2Icon } from "@chakra-ui/icons";
import { MdOutlineFavorite, MdMovieCreation } from 'react-icons/md'
import { Avatar, Flex, Heading, Input, InputGroup, InputRightElement, Box, Link, MenuButton, Menu, IconButton, Icon, MenuList, MenuItem, HStack, useColorMode, Tooltip, Switch } from "@chakra-ui/react";
import NextLink from 'next/link'
import theme from "../../../theme";
import { useRouter } from "next/router";

export const Navbar:React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { colorMode, toggleColorMode } = useColorMode();
    return (
      <>
      <Box as="header" paddingX={16} paddingTop={4} marginBottom={16}>
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
              <IconButton aria-label="favorite movie link" as={NextLink} href="/" variant="ghost" colorScheme="teal" icon={<Icon as={MdOutlineFavorite} />} />
            </Tooltip>
            <Tooltip label="Watchlist">
              <IconButton aria-label="favorite movie link" as={NextLink} href="/" variant="ghost" colorScheme="teal" icon={<Icon as={MdMovieCreation} />} />
            </Tooltip>
            </Box>
            <Avatar name='Dan Abrahmov' bgColor="teal" /> 
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
      </>
    )
}