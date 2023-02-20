import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const theme = extendTheme({
  fonts: {
    heading: `'montserrat', sans-serif`,
    body: `'montserrat', sans-serif`,
  },
  semanticTokens: {
    colors: {
      text: {
        default: 'gray.400',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radio: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
  },
  breakpoints,
})

export default theme
