import {
    Text,
    Flex,
    Spinner,
    Box,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    StackDivider,
    Icon,
    Image,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    CardFooter,
    useToast,
    useDisclosure,
    Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { itemCart } from "../../Reducers/cartSlice";
import { useEffect } from "react";




function CheckOutPage() {
    // react-router-dom navigate
    // const navigate = useNavigate()



    // modals
    // const changeAddress = useDisclosure();
    // const addNewAddress = useDisclosure();

    // required state
    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState([]);
    const [branch, setBranch] = useState('')
    const [method, setMethod] = useState([]);
    const [shippingFee, setShippingFee] = useState(0)
    const [service, setService] = useState('')
    const [valueRadio, setValueRadio] = useState('0')
    const [cost, setCost] = useState(0)


    // redux
    const dispatch = useDispatch()

    // token local storage 
    let token = localStorage.getItem('grocery_login')


    // fetch cart items 

    const getCartChecked = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/checkout/')
            // console.log('ini dari response getCart: ', response.data.data)

            console.log('ini response get checked', response)

            dispatch(itemCart(response.data.data))
            setCart(response.data.data)
            // setPrice(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printCart = () => {
        return cart.map((val, idx) => {
            return (
                <>
                    <Flex>
                        <Flex w={"full"}>
                            <Flex flexDir={"column"} p={2} w={{ base: "30%", lg: "25%" }}>
                                <Flex
                                    h={"full"}
                                    w={"full"}
                                    flexDir={"column"}
                                    justifyContent={"center"}
                                >
                                    <Image
                                        objectFit={"contain"}
                                        height={{
                                            base: "120px",
                                            md: "170px",
                                        }}
                                        w={"full"}
                                        rounded={"xl"}
                                        alt="product picture"
                                        // src={`${API_URL}${val.product.productImage}`}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            )
        })
    }

    // rupiah converter function 
    const rupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };


    // shipping function
    const shippingMethod = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/shipping/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log('ini response shippingMethod: ', response.data.data.costs)

            setMethod(response.data.data.costs)
            // setBranch(response.branch)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log('ini isinya method: ', method)

    const printMethod = () => {
        return method.map((val, idx) => {
            let key = idx.toString()
            return (
                <Stack direction={'row'}>
                    <Radio
                        value={key}
                        w="full"
                        size={"sm"}
                        // alignItems={"center"}
                        mx={"auto"}
                        my={2}
                        direction={'row'}
                        colorScheme='green'
                    >
                        <Flex
                            // flexWrap={"wrap"}
                            justifyContent={"space-between"}
                            w={'xs'}
                            fontSize={'sm'}
                        >
                            <Text textTransform="uppercase">{`JNE - ${val.service}`}</Text>
                            <Text>{rupiah(val.cost[0].value)}</Text>
                        </Flex>
                        <Text fontSize="xs" opacity={"0.5"}>
                            {`${val.description} - ${val.cost[0].etd} days`}
                        </Text>
                    </Radio>
                </Stack>
            )
        })
    }

    useEffect(() => {
        shippingMethod();
    }, []);

    useEffect(() => {
        getCartChecked()
    }, [])

    return (
        <>
            <Flex
                my={{ base: "16", md: "12" }}
                color={"white"}
                mx={"auto"}

            >
                {/* <Flex
                    color={"white"}
                    rounded={"none"}
                    // mx={'auto'}
                    width={'7xl'}
                > */}
                <Box
                    w={"7xl"}
                    mx={'auto'}
                >
                    <Card
                        color={"white"}
                        bg={"inherit"}
                        boxShadow={"md"}
                        rounded={'none'}
                        mx={'auto'}
                    >
                        <CardHeader>
                            <Heading
                                size="md"
                            >
                                Delivery Address
                            </Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Flex
                                    justifyContent={"space-evenly"}
                                    letterSpacing={"wider"}
                                    alignItems={"flex-start"}
                                >
                                    <Box w={"80%"}>
                                        <Text fontWeight={"semibold"} mb="4">
                                        </Text>
                                        <Text>
                                            No address filled, please add a new address.
                                        </Text>
                                        {/* ) : ( */}
                                        <Text flexWrap={"wrap"} mb="4">
                                        </Text>
                                    </Box>
                                    <Text
                                        as={"button"}
                                        color={"#6FA66F"}
                                        fontWeight={"semibold"}
                                    >
                                        Change
                                    </Text>
                                </Flex>
                                <Flex
                                    alignItems={"center"}
                                    fontWeight={"semibold"}
                                    color={"#6FA66F"}
                                    as="button"
                                >
                                    <Icon boxSize={"6"}
                                        as={FiPlus}
                                        mx="2" />
                                    <Text>Add New Address</Text>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
                {/* </Flex> */}
            </Flex>

            <Box
                w={'7xl'}
                mx={'auto'}
                rounded={'none'}
            >
                <Card
                    color={"white"}
                    bg={"inherit"}
                    boxShadow={"md"}
                    rounded={'none'}
                >
                    <CardHeader>
                        <Heading size="md">Order Summary</Heading>
                    </CardHeader>

                    <CardBody>
                        <Flex flexDir={"column"} gap={"8"}>
                            {/* {printCart()} */}
                        </Flex>
                    </CardBody>
                </Card>
            </Box>

            {/* summary */}
            <Box
                w={'7xl'}
                mx={'auto'}
                rounded={'none'}
                my={'8'}
            >
                <Card
                    bg={"inherit"}
                    w={"full"}
                    my={'4'}
                    rounded={"none"}
                >
                    <CardBody>
                        <Flex justify={'space-between'}>
                            <Box
                                fontSize={'lg'}
                            // my="auto"
                            // mr={'32'}
                            >
                                <Text
                                    fontWeight={'semibold'}
                                >
                                    Shipping Method
                                </Text>
                            </Box>
                            <Box>
                                <RadioGroup onChange={setValueRadio} value={valueRadio}>
                                    {printMethod()}
                                </RadioGroup>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>
                {/* )} */}

                <Card w={"full"}>
                    <CardHeader>
                        <Heading size="lg">Total</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                            <Box>
                                <Flex justifyContent={"space-between"} mt="2">
                                    <Text fontSize={{ base: "md", md: "sm", lg: "md" }}>
                                        SubTotal
                                    </Text>
                                    <Text
                                        fontSize={{ base: "md", md: "sm", lg: "md" }}
                                        fontWeight={"semibold"}
                                    >
                                    </Text>
                                </Flex>

                                <Flex justifyContent={"space-between"} mt="2">
                                    <Text fontSize={{ base: "md", md: "sm", lg: "md" }}>
                                        Delivery Cost
                                    </Text>
                                    <Text
                                        fontSize={{ base: "md", md: "sm", lg: "md" }}
                                        fontWeight={"semibold"}
                                    >
                                        -
                                    </Text>
                                    <Text
                                        fontSize={{ base: "md", md: "sm", lg: "md" }}
                                        fontWeight={"semibold"}
                                    >

                                    </Text>
                                </Flex>

                                <Flex justifyContent={"space-between"} mt="2">
                                    <Text fontSize={{ base: "md", md: "sm", lg: "md" }}>
                                        Tax (10%)
                                    </Text>
                                    <Text
                                        fontSize={{ base: "md", md: "sm", lg: "md" }}
                                        fontWeight={"semibold"}
                                    >

                                    </Text>
                                </Flex>
                            </Box>
                            <Flex justifyContent={"space-between"} my="2">
                                <Text fontSize={{ base: "md", md: "sm", lg: "md" }}>
                                    Total
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                                    color={"#34D399"}
                                    fontWeight={"semibold"}
                                >
                                    -
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                                    color={"#34D399"}
                                    fontWeight={"semibold"}
                                >

                                </Text>

                            </Flex>
                            <Button
                                bgColor={'#6FA66F'}
                                _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                // size="lg"
                                fontSize="lg"
                                // rightIcon={<FaArrowRight />}
                                color={'white'}
                                rounded={'none'}
                                variant={"solid"}
                                mt="4"
                            >
                                Proceed to Payment
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>

            </Box>

            {/* modal untuk address */}
            <Modal

                size={{ base: "xs", md: "md" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RadioGroup>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}
                        >
                            Confirm
                        </Button>
                        <Button
                        >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* modal untuk add new address */}

            <Modal
                size={{ base: "xs", md: "md" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <FormControl>
                                <FormLabel>Province</FormLabel>
                                <Select>

                                </Select>
                            </FormControl>

                            <FormControl mt={2}>
                                <FormLabel>City</FormLabel>
                                <Select>

                                </Select>
                            </FormControl>

                            <FormControl mt={2}>
                                <FormLabel>Address</FormLabel>
                                <Textarea
                                    placeholder="Address"
                                    maxLength={300}
                                    resize={"none"}
                                />
                            </FormControl>

                            <FormControl mt={2}>
                                <FormLabel>Postal Code</FormLabel>
                                <Input
                                    isDisabled={true}
                                    _placeholder={{ opacity: 1, color: "black" }}
                                />
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button
                        >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CheckOutPage;