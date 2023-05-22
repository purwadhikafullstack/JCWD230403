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
    Input,
    VStack, 
    useToast

} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

function TransactionDetail() {
    let token = localStorage.getItem('grocery_login')

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalPayment = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const inputFile = React.useRef(null);

    const navigate = useNavigate()

    const toTransactionList = () => {
        navigate('/list')
    }

    const onChangeFile = (val) => {
        setFile(val.target.files[0]);
    };

    const [file, setFile] = useState({});
    const [order, setOrder]= useState("")

    const btnConfirmPayment = async () => {
        try {
            if (file != null) {
                let formData = new FormData();

                formData.append(
                    "data",
                    JSON.stringify({
                        paymentProof: file,
                        status: 'Waiting for confirmation payment'
                    })
                );

                formData.append("image", file);

                const response = await axios.patch(`http://localhost:8000/api/transaction/payment`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setFile(null);
                    onClose();
                }
            } else {
                toast({
                    title: "Failed to Upload Image",
                    description: `Please Ensure that an image is chosen`,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    
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
                        <Heading size='md'> Thank you for shopping with us</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Please confirm your payment</Text>
                    </CardBody>
                    <CardFooter>
                        <VStack>
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
                                mb={'2'}

                            >
                                Pay now
                            </Button>
                            <Button
                                borderColor={'#6FA66F'}
                                mr={'4'}
                                onClick={toTransactionList}
                                color={'#6FA66F'}
                                variant={'link'}
                            // _hover={{tra}}
                            >
                                View order list
                            </Button>
                        </VStack>

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
                                    onChange={onChangeFile}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            {file != null ? (
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
                                    onClick={btnConfirmPayment}
                                >
                                    Save
                                </Button>
                            ) : (
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
                                    onClick={btnConfirmPayment}
                                    isDisabled={true}
                                >
                                    Save
                                </Button>
                            )}
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
}

export default TransactionDetail;