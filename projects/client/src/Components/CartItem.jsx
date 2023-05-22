import {
    Box,
    CloseButton,
    Flex,
    HStack,
    Image,
    Stack,
    Text,
    useColorModeValue,
    Icon,
    Checkbox,
    Divider,
    useDisclosure,
    Button,
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from 'axios'

function CartItem({ productName, price, productImg, quantity, category, cartId, productId, getCartItems, checkAllProduct, finalPrice, isChecked }) {

    // state function
    const [productStock, setProductStock] = useState(0);
    const [qtyProduct, setQtyProduct] = useState(quantity);
    const [checkProduct, setCheckProduct] = useState(isChecked ? true : false);


    // handle button 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnDelete = () => {
        onClose()
        // onDelete()
    }

    // redux
    const cartSelector = useSelector((state) => state.cartSlice)
    // console.log('ini isi cart nya dari reducer isChecked: ', cartSelector.cart);

    // toast 
    const toast = useToast()

    // rupiah converter function 
    const rupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    // get cart item by id (stock)
    const getCartById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cart/${cartId}`)
            
            // console.log('ini dari response getcartbyid', response.data.data[0].product.stockBranches[0].stock)

            const stock = response.data.data[0].product.stockbranches[0].stock

            setProductStock(stock)

            // if(response.data.data.isChecked === true){
            //     setCheckProduct(true)
            // } else {
            //     setCheckProduct(false)
            // }
        } catch (error) {
            console.log(error)
        }
    }

    // get cart by product
    const getCartByProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cart/cartItem/${productId}`)
        } catch (error) {
            console.log(error)
        }
    }

    // check cart item
    const checkPerProduct = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/cart/check/${cartId}`)

            console.log('ini response dari checkperproduct: ', response)

            if (response.data.data.isChecked === true) {
                setCheckProduct(true)
            } else {
                setCheckProduct(false)
            }
            finalPrice()
        } catch (error) {
            console.log(error);
        }
    }

    const addQty = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/cart/add/${cartId}`)
            getCartItems()
            setQtyProduct(quantity + 1)

            finalPrice()
            getCartByProduct()

        } catch (error) {
            console.log(error)
        }
    }

    const decQty = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/cart/decrease/${cartId}`)
            getCartItems()
            if (quantity <= 1) {
                return 1
            }
            setQtyProduct(quantity - 1)

            finalPrice()
            getCartByProduct()

        } catch (error) {
            console.log(error)
        }
    }

    // render 
    useEffect(() => {
        getCartById()
        getCartByProduct()
        getCartItems()
    }, [checkAllProduct, qtyProduct])


    return (
        <>
            <Flex
                direction={{
                    base: "column",
                    md: "row",
                }}
                justify="space-between"
                align="center"
            >
                <Stack direction="row" spacing="5" width="full">
                    <Checkbox
                        colorScheme='green'
                        size="lg"
                        borderColor="#6FA66F"
                        defaultChecked={checkProduct ? true : false}
                        onChange={() => checkPerProduct()}
                    >
                        {/* {checkProduct} */}
                    </Checkbox>
                    <Image
                        rounded="lg"
                        width="120px"
                        height="120px"
                        fit="cover"
                        src={productImg}
                        alt="product image"
                        draggable="false"
                        loading="lazy"
                    />
                    <Box pt="4">
                        <Stack spacing="0.5">
                            <Text fontWeight="medium">{productName}</Text>
                            <Text
                                color={useColorModeValue("gray.600", "gray.400")}
                                fontSize="sm"
                            >
                                category
                                {/* {category} */}
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
                <Flex
                    width="full"
                    justify="space-between"
                    display={{
                        base: "none",
                        md: "flex",
                    }}
                >
                    <Box
                        display="flex"
                        borderRadius="10px"
                        boxShadow="base"
                        justifyContent="space-between"
                    >
                        <Button
                            variant="unstyled"
                            onClick={decQty}
                            color={qtyProduct > 1 ? "#0095DA" : "#c0cada"}
                            // isDisabled={productStock <= qtyProduct}

                        >
                            <MinusIcon fontSize="10" />
                        </Button>

                        <Text mt="2">
                            {qtyProduct}
                            
                        </Text>

                        <Button
                            variant="unstyled"
                            onClick={addQty}
                            color={productStock <= qtyProduct ? "#c0cada" : "#0095DA"}
                        >
                            <AddIcon fontSize="10" />

                        </Button>
                    </Box>

                    <HStack spacing="1">
                        <Text>
                            {rupiah(price)}

                        </Text>
                    </HStack>

                    <CloseButton />
                </Flex>
            </Flex>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove item from cart
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            The item that you choose will be removed from cart
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Back</Button>
                            <Button colorScheme="red" ml={3}>
                                Remove
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default CartItem;