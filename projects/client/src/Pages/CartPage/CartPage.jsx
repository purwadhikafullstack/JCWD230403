import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Link as LinkChakra,
    Stack,
    Text,
    Image,
    Alert,
    AlertIcon,
    AlertTitle,
    Checkbox,
    Divider,
    AlertDescription,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@chakra-ui/react"
import logo from '../../Asset/logo.png'
import { FaArrowRight } from "react-icons/fa"
import { Link, Link as LinkRouterDom, useNavigate } from "react-router-dom"
import CartItem from "../../Components/CartItem";

function CartPage() {
    // Token
    // state function
    // redux toolkit 
    // react-router-dom
    // toast chakra UI
    // alert
    // fetch cart item 
    // cart data

    return (
        <>
            <Box
                maxW={{ base: "3xl", lg: "7xl" }}
                mx="auto"
                px={{ base: "4", md: "8", lg: "12" }}
                py={{ base: "6", md: "8", lg: "36" }}
            >
                <Stack
                    direction={{ base: "column", lg: "row" }}
                    align={{ lg: "flex-start" }}
                    spacing={{ base: "8", md: "16" }}
                >
                    <Stack spacing={{ base: "8", md: "10" }} flex="2">
                        <Heading
                            fontSize="2xl"
                            fontWeight="extrabold"
                        >
                            {/* <Image src={logo}></Image> */}
                            <Text  color={'6FA66F'}>
                                FreshFinds | Cart
                            </Text>
                        </Heading>
                        <Flex justifyContent="space-between">
                            <Checkbox
                                // colorScheme="teal"
                                // isChecked={allProductCheck}
                                borderColor="#6FA66F"
                                size="lg"

                            >
                                <Text>Select All</Text>
                            </Checkbox>
                            {/* {allProductCheck !== true ? null : ( */}
                            <Text
                                fontSize="17px"
                                fontWeight="700"
                                color="#6FA66F"
                                cursor="pointer"
                            // position={"relative"}
                            // onClick={() => onOpen()}
                            >
                                Delete
                            </Text>
                            {/* )} */}
                        </Flex>
                        <Divider backgroundColor="#F6F6F6" border="5px" />

                        <Stack spacing="6">
                            {/* {!cartSelector.cart.length ? ( */}
                            <Alert
                                // status="error"
                                bgColor={'#F6F6F6'}
                                variant="subtle"
                                flexDir="column"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                h="200px"
                            >
                                <AlertIcon boxSize="40px" mr="0" />
                                <AlertTitle
                                    my={'2'}
                                >
                                    Your cart is empty!
                                </AlertTitle>
                                <AlertDescription
                                    mb="2"
                                >
                                    Looking for more options? Check out our recommended products.
                                </AlertDescription>
                                <Link to="/product">
                                    <Button>Continue Shopping?</Button>
                                </Link>
                            </Alert>
                            {/* // ) : ( */}
                            {/* //     renderCartItem() */}
                            {/* // )} */}
                        </Stack>
                    </Stack>

                    {/* Ringkasan Belanja */}
                    <Flex direction="column" align="center" flex="1">
                        <Stack
                            spacing="8"
                            borderWidth="1px"
                            rounded="lg"
                            padding="8"
                            width="full"
                        >
                            <Heading size="md">Summary</Heading>

                            {/* {!cartSelector.totalQty ? ( */}
                            <Stack spacing="6">
                                <Flex justify="space-between" fontSize="sm">
                                    <Text fontWeight="medium" color="gray.600">

                                    </Text>
                                    <Text fontWeight="medium">
                                        {/* {Rupiah(cartSelector.subTotal)} */}
                                    </Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text fontSize="lg" fontWeight="semibold">
                                        Amount
                                    </Text>
                                    <Text fontSize="xl" fontWeight="extrabold">
                                        {/* {Rupiah(cartSelector.subTotal)} */}
                                    </Text>
                                </Flex>
                            </Stack>
                            {/* ) : ( */}
                            <Stack spacing="6">
                                <Flex justify="space-between" fontSize="sm">
                                    <Text fontWeight="medium" color="gray.600">
                                        amount 7 pcs {/* Total Harga ({cartSelector.totalQty} Barang) */}
                                    </Text>
                                    <Text fontWeight="medium">
                                        {/* {Rupiah(cartSelector.subTotal)} */}
                                        Rp20.000
                                    </Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text fontSize="lg" fontWeight="semibold">
                                        total
                                    </Text>
                                    <Text fontSize="xl" fontWeight="extrabold">
                                        {/* {Rupiah(cartSelector.subTotal)} */}
                                        Rp20.000
                                    </Text>
                                </Flex>
                            </Stack>
                            {/* )} */}

                            {/* {!cartSelector.totalQty ? ( */}
                            <Button
                                // colorScheme="teal" 
                                bgColor={'#6FA66F'}
                                _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                size="lg"
                                fontSize="lg"
                                rightIcon={<FaArrowRight />}
                                color={'white'}
                                rounded={'none'}
                            // onClick={btnCheckout}
                            // isDisabled={true}
                            >
                                Checkout ( 0 )
                            </Button>
                            {/* ) : ( */}

                            {/* )} */}
                        </Stack>
                        <HStack mt="6" fontWeight="semibold">
                            <p>or</p>

                            <LinkChakra color="#6FA66F">
                                <LinkRouterDom to="/product">Continue Shopping</LinkRouterDom>
                            </LinkChakra>
                        </HStack>
                    </Flex>
                </Stack>
            </Box>

            {/* Delete All Product */}
            <AlertDialog >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {/* delete {cartSelector.cart.length} product */}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to remove this item from your cart?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button>Back</Button>
                            <Button colorScheme="red" ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default CartPage;