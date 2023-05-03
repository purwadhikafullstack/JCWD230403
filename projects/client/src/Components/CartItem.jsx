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

function CartItem({ productName, price, productImg, quantity, category, cartId, getCartItems, checkAllProduct }) {

    // state function
    const [productStock, setProductStock] = useState(0)
    const [qtyProduct, setQtyProduct] = useState(quantity)


    // handle button 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnDelete = () => {
        onClose()
        // onDelete()
    }

    // redux
    const cartSelector = useSelector((state) => state.cartSlice)

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

    // get cart by id
    const getCartById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/cart/${cartId}`)

            console.log('ini dari response cartId: ', response)

        } catch (error) {
            console.log(error)
        }
    }
    // get cart item by id

    // render 
    useEffect(() => {
        getCartItems()
    }, [checkAllProduct])


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
                    // isChecked={checkProduct}
                    // onChange={() => checkPerProduct()}
                    ></Checkbox>
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
                        // color={qtyProduct > 1 ? "#0095DA" : "#c0cada"}
                        >
                            <MinusIcon fontSize="10" />
                        </Button>

                        <Text mt="2">
                            {/* {qtyProduct} */}
                            1
                        </Text>

                        <Button
                            variant="unstyled"
                        // isDisabled={productStock <= qtyProduct}
                        // color={productStock <= qtyProduct ? "#c0cada" : "#0095DA"}
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