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
    useDisclosure,
    AlertDescription,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    useToast,
} from "@chakra-ui/react"
import logo from '../../Asset/logo.png'
import { FaArrowRight } from "react-icons/fa"
import { Link, Link as LinkRouterDom, useNavigate } from "react-router-dom"
import CartItem from "../../Components/CartItem";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { itemCart, getSubTotal, getTotalQty, resetCart } from "../../Reducers/cartSlice"


function CartPage() {
    // Token
    let token = localStorage.getItem('grocery_login')

    // state function
    const [cartItems, setCartItems] = useState(false);
    // const [checkout, setCheckOut] = useState({});

    // redux toolkit 
    const dispatch = useDispatch()
    const cartSelector = useSelector((state) => state.cartSlice)

    // console.log('ini reducer nya cart', cartSelector)

    // console.log('ini cartselector dari cart page: ', cartSelector);

    // react-router-dom
    const navigate = useNavigate()

    // toast chakra UI
    const toast = useToast()

    // alert
    const { isOpen, onOpen, onClose } = useDisclosure()

    // fetch cart item 
    const getCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/cart/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log('ini dari response getCartItem: ', response.data.data)

            dispatch(itemCart(response.data.data))

            const productChecked = response.data.data.map((val) => val.isChecked)

            if (!productChecked.includes(false)) {
                setCartItems(true)
            } else {
                setCartItems(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // rupiah converter function 
    const rupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };


    // checked all product
    const checkAllProduct = async () => {
        try {
            const response = await axios.patch("http://localhost:8000/api/cart/checkAll", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('ini response dari yang di checked: ', response);

            const productChecked = response.data.data.map((val) => val.isChecked)

            if (!productChecked.includes(false)) {
                setCartItems(true)
            } else {
                setCartItems(false)
            }

            getCartItems()
            finalPrice()
        } catch (error) {
            console.log(error)
        }
    }

    // total function
    // const [checkOut, setCheckOut] = useState([])
    // const [total_price, setTotal_price] = useState(0)
    // const [total_qty, setTotal_qty] = useState(0)
    const finalPrice = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/cart/price/total", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // console.log('ini response total harga: ', response.data.data);
            
            let finalPrice = 0
            let totalQty = 0

            response.data.data.forEach(val => {
                finalPrice += val.quantity * val.product.price
                totalQty += val.quantity
            });

            dispatch(getSubTotal(finalPrice))
            dispatch(getTotalQty(totalQty))
            getCartItems()


            // setCheckOut(response.data.data)

            // let kali = response.data.data.map((val) => {

            //     let total = 0
            //     if (val.isChecked === true) {
            //         total += val.quantity * val.product.price
            //     } else {
            //         total = 0
            //     }

            //     return total
            // })

            // let tambah = kali.reduce((a, b) => a + b)

            // setTotal_price(parseInt(tambah))

            // let amount = 0
            // let totalQty = response.data.data.map((val) => {
                
            //     amount = val.quantity

            //     amount.reduce((a,b) => a + b)

            //     return amount 
            // })

            // let amount = totalQty.reduce((a, b) => a + b)

            // setTotal_qty(totalQty)

        } catch (err) {
            console.log(err)
        }
    }

    // const calculate = () => {
    //     let kali = checkOut.map((val,idx) => {
    //         return val.quantity * val.product.price
    //     })
    //     let tambah = kali.reduce((a,b) => a + b)
    //     return tambah;
    // }
    // checkout button
    const btnCheckout = () => {
        dispatch(resetCart())
        navigate("/checkout")

    }

    // delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${id}`)

            getCartItems()

            toast({ title: "Remove product", status: "success", duration: 1000 })

        } catch (error) {
            console.log(error)
        }
    }

    // render cart component
    const renderCartItem = () => {
        return cartSelector.cart.map((val) => {
            return (
                <CartItem
                    key={val.id.toString()}
                    productId={val.productId}
                    quantity={val.quantity}
                    cartId={val.id}
                    isChecked={val.isChecked}
                    productName={val.product?.name}
                    price={val.product?.price}
                    productImg={val.product?.image}
                    // category={val.category.category}
                    getCartItems={getCartItems}
                    checkAllProduct={cartItems}
                    finalPrice={finalPrice}
                />
            )
        })
    }

    useEffect(() => {
        getCartItems()
        finalPrice()
    }, [])

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
                            <Text color={'6FA66F'}>
                                FreshFinds | Cart
                            </Text>
                        </Heading>
                        <Flex justifyContent="space-between">
                            <Checkbox
                                // isChecked={cartItems}
                                borderColor="#6FA66F"
                                size="lg"
                                colorScheme={'green'}
                                onChange={() => checkAllProduct}
                            >
                                <Text>Select All</Text>
                            </Checkbox>
                            {/* {cartItems !== true ? null : ( */}
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
                            {/* )}  */}
                        </Flex>
                        <Divider backgroundColor="#F6F6F6" border="5px" />

                        <Stack spacing="6">
                            {!cartSelector.cart.length ? (
                                <Alert
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
                            ) : (
                                renderCartItem()
                            )}
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

                            {!getTotalQty ? (
                                <Stack spacing="6">
                                    <Flex justify="space-between" fontSize="sm">
                                        <Text fontWeight="medium" color="gray.600">
                                            Amount of ({cartSelector.getTotalQty} pcs)
                                        </Text>
                                        <Text fontWeight="medium">
                                            {/* Rp {cartSelector.subTotal} */}
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold">
                                            Total
                                        </Text>
                                        <Text fontSize="xl" fontWeight="extrabold">
                                            {/* Rp {cartSelector.getSubTotal} */}
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                </Stack>
                            ) : (

                                <Stack spacing="6">
                                    <Flex justify="space-between" fontSize="sm">
                                        <Text fontWeight="medium" color="gray.600">
                                            Amount of ({cartSelector.totalQty} pcs)
                                        </Text>
                                        <Text fontWeight="medium">
                                            {/* Rp {cartSelector.subTotal} */}
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold">
                                            Total
                                        </Text>
                                        <Text fontSize="xl" fontWeight="extrabold">
                                            {/* Rp {cartSelector.subTotal} */}
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                </Stack>
                            )}

                            {/* {!cartSelector.totalQty ? (
                                <Stack spacing="6">
                                    <Flex justify="space-between" fontSize="sm">
                                        <Text fontWeight="medium" color="gray.600">
                                            Amount of (0 pcs)
                                        </Text>
                                        <Text fontWeight="medium">
                                            Rp 0
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold">
                                            Total
                                        </Text>
                                        <Text fontSize="xl" fontWeight="extrabold">
                                            Rp 0
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                </Stack>
                            ) : (
                                <Stack spacing="6">
                                    <Flex justify="space-between" fontSize="sm">
                                        <Text fontWeight="medium" color="gray.600">
                                            Amount of ({cartSelector.totalQty} item(s))
                                        </Text>
                                        <Text fontWeight="medium">
                                            {rupiah(cartSelector.subTotal)}

                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold">
                                            Total
                                        </Text>
                                        <Text fontSize="xl" fontWeight="extrabold">
                                            {rupiah(cartSelector.subTotal)}
                                        </Text>
                                    </Flex>
                                </Stack>
                            )} */}

                            {!cartSelector.totalQty ? (
                                <Button
                                    bgColor={'#6FA66F'}
                                    _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                    size="lg"
                                    fontSize="lg"
                                    rightIcon={<FaArrowRight />}
                                    color={'white'}
                                    rounded={'none'}
                                    isDisabled={true}
                                >
                                    Checkout ( 0 )
                                </Button>
                            ) : (
                                <Button
                                    bgColor={'#6FA66F'}
                                    _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                    size="lg"
                                    fontSize="lg"
                                    rightIcon={<FaArrowRight />}
                                    color={'white'}
                                    rounded={'none'}
                                    onClick={btnCheckout}
                                >
                                    Checkout ( {cartSelector.totalQty} )
                                </Button>
                            )}
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