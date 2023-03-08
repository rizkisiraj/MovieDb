import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"

const SearchModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{base: "xs",md:"xl"}}>
      <ModalOverlay />
      <ModalContent>
        <form action="/search/" onSubmit={() => console.log('search')}>
        <InputGroup >
            <InputLeftElement
            pointerEvents='none'
            children={<Search2Icon color='teal.300' />}
            mt="1"
            />
            <Input name="name" paddingY="24px" colorScheme="teal" type='text' placeholder='Search movies' />
        </InputGroup>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default SearchModal;