import { Box } from "@chakra-ui/react"
import { Navbar } from "../elements/navbar/navbar.component"
import { Footer } from "../elements/footer/footer.component"

type Props = {
  children:React.FC
}

export const Layout = ({ children }) => {
  return (
    <>
    <Navbar />
    <Box as="main">
      { children }
    </Box>
    <Footer />
    </>
  )
}