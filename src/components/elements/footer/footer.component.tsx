import { Center } from "@chakra-ui/react"
import theme from "../../../theme"

export const Footer:React.FC = () => {
    return (
      <Center as='footer' bgColor="teal.300" color={theme.text} padding="2rem">
        <p>Made by Rizki Siraj</p>
      </Center>
    )
}