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
    useColorModeValue,
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
    HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getSubTotal, itemCart } from "../../Reducers/cartSlice";
import { useEffect } from "react";
import { render } from "react-dom";




function CheckOutPage() {
    // react-router-dom navigate
    const navigate = useNavigate()



    // modals
    // const changeAddress = useDisclosure();
    // const addNewAddress = useDisclosure();

    // required state
    const [branch, setBranch] = useState('')
    const [shippingFee, setShippingFee] = useState(0)
    const [service, setService] = useState('')

    // delivery method state
    const [method, setMethod] = useState([]);
    const [valueRadio, setValueRadio] = useState('0')
    const [selectedShipping, setSelecetedShipping] = useState(null)

    // summary state
    const [cart, setCart] = useState([]);
    const [cost, setCost] = useState(0)
    const [tax, setTax] = useState(0)


    // redux
    const dispatch = useDispatch()
    const cartSelector = useSelector((state) => state.cartSlice)

    // token local storage 
    let token = localStorage.getItem('grocery_login')


    // fetch cart items 

    const getCartChecked = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/transaction/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('ini response get checked', response.data.data)

            let price = 0

            response.data.data.forEach(val => {
                price += val.quantity * val.product.price
            });

            dispatch(itemCart(response.data.data))
            dispatch(getSubTotal(price))
            setCart(response.data.data)

            let taxValue = price * 0.1
            setTax(parseInt(taxValue))

        } catch (error) {
            console.log(error)
        }
    }
    // console.log('ini tax:', tax)

    const renderCart = () => {
        // console.log('ini val.product: ', cartSelector.cart[0].product)
        return cartSelector.cart.map((val, idx) => {
            return (
                <>
                    <Flex w={"full"}>
                        <Flex
                            flexDir={{
                                base: "column",
                                md: "row"
                            }}
                            p={2}
                            w={'full'}
                            justify={"space-between"}
                            align="center"
                        >
                            <Image
                                rounded="lg"
                                width="120px"
                                height="120px"
                                fit="contain"
                                alt="product image"
                                draggable="false"
                                src={val.product?.image}
                            />
                            <Text>
                                {val.product.name}
                            </Text>
                            <Text>
                                {val.quantity}
                            </Text>
                            <Text>
                                {rupiah(val.quantity * val.product.price)}
                            </Text>
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
            // console.log('ini untuk harga ongkir nya: ', response.data.data.costs[0].cost[0].value)

            setMethod(response.data.data.costs)
            // setCost(response.data.data.costs[0].cost[0].value)

            // setBranch(response.branch)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log('ini isinya method: ', method)
    // console.log('ini selected shipping:', selectedShipping)
    // alert(selectedShipping)

    const printMethod = () => {
        return method.map((val, idx) => {
            let key = idx.toString()
            return (
                <Stack direction={'row'}
                    onClick={() => setSelecetedShipping(val.cost[0].value)}
                >
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
    // proceed to payment

    const checkOutBtn = async () => {
        let checkout = {
            shippingMethod: method?.service,
            amount: cartSelector.subTotal + selectedShipping + tax,
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/transaction/create`, checkout, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('ini response dari checkout btn: ', response)
        } catch (error) {
            console.log(error)
        }
        navigate('/detail')
    }

    useEffect(() => {
        shippingMethod();
    }, []);

    useEffect(() => {
        getCartChecked()
        // renderCart()
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
                my={'8'}
            >
                <Card
                    // color={"white"}
                    // bg={"inherit"}
                    boxShadow={"md"}
                    rounded={'none'}
                >
                    <CardHeader>
                        <Heading size="lg">Order Summary</Heading>
                    </CardHeader>
                    <CardBody>
                        <Flex
                            flexDir={"column"}

                            // gap={"8"}
                            justify={'space-between'}
                        >
                            {/* <Box>
                                <Text
                                    fontWeight={'semibold'}
                                >
                                    Order Summary
                                </Text>
                            </Box> */}
                            <Flex
                                flexDir={{
                                    base: "column",
                                    md: "row"
                                }}
                                p={2}
                                w={'full'}
                                justify={"space-between"}
                                align="center"
                            >
                                <Box>

                                </Box>
                                <Box>
                                    <Flex
                                        fontWeight={'semibold'}
                                        flexDirection={'row-reverse'}
                                        justify={'space-evenly'}
                                    >
                                        <Text>
                                            Total
                                        </Text>
                                        <Text>
                                            Quantity
                                        </Text>
                                        <Text>
                                            Name
                                        </Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Box>
                                {renderCart()}
                            </Box>
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
                    <CardHeader>
                        <Heading size="lg">Shipping Method</Heading>
                    </CardHeader>
                    <CardBody>

                        <Flex justify={'space-between'}>
                            {/* <Box
                                fontSize={'lg'}
                            // my="auto"
                            // mr={'32'}
                            >
                                <Text
                                    fontWeight={'semibold'}
                                >
                                    Shipping Method
                                </Text>
                            </Box> */}
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
                                        {rupiah(cartSelector.subTotal)}
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
                                        {rupiah(selectedShipping)}
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
                                        {rupiah(tax)}
                                    </Text>
                                </Flex>
                            </Box>
                            <Flex justifyContent={"space-between"} my="2">
                                <Text
                                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                                    fontWeight={'bold'}
                                    color={'#6FA66F'}
                                >
                                    Total
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                                    color={"#34D399"}
                                    fontWeight={"semibold"}
                                >

                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "sm", lg: "md" }}
                                    color={"#6FA66F"}
                                    fontWeight={"semibold"}
                                >
                                    {rupiah(cartSelector.subTotal + selectedShipping + tax)}
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
                                onClick={checkOutBtn}
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