import {
    Box,
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    Text, 
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalContent,
    FormLabel,
    ModalOverlay,
    FormControl,
    useDisclosure,
    ModalCloseButton,
    Input

} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function TransactionDetail() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const inputFile = React.useRef(null);

    const navigate = useNavigate()

    const toTransactionList = () => {
        navigate('/list')
    }

    // const []

    return (
        <>
            <Box
                height={'2xl'}
                w={'50%'}
                mx={'auto'}
                mt={'120'}
            >
                <Card
                    align='center'
                >
                    <CardHeader>
                        <Heading size='md'> Transaction Details</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Please confirm your payment</Text>
                    </CardBody>
                    <CardFooter>
                        <Button
                            borderColor={'#6FA66F'}
                            mr={'4'}
                            onClick={toTransactionList}
                        >View order list
                        </Button>
                        <Button
                            // colorScheme='blue'
                            bgColor={'#6FA66F'}
                            _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                            // size="lg"
                            fontSize="lg"
                            // rightIcon={<FaArrowRight />}
                            color={'white'}
                            rounded={'none'}
                            variant={"solid"}
                            onClick={onOpen}

                        >Pay now
                        </Button>

                    </CardFooter>
                </Card>
                {/* <Button onClick={onOpen}>Open Modal</Button> */}

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Upload your payment proof</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <input 
                                type={'file'}
                                id={'file'}
                                ref={inputFile}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button 
                            mr={3}
                            bgColor={'#6FA66F'}
                            _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                            // size="lg"
                            fontSize="lg"
                            // rightIcon={<FaArrowRight />}
                            color={'white'}
                            rounded={'none'}
                            variant={"solid"}
                            >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
}

export default TransactionDetail;