import {
    Box,
    Flex,
    Text,
    Stack,
    VStack,
    HStack,
    Input,
    InputGroup,
    InputAddon,
    InputLeftElement,
    InputRightElement,
    Button,
    FormControl,
    FormHelperText,
    useToast,
    useNumberInput,
    useDisclosure,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react'
import {
    AddIcon,
    MinusIcon
} from '@chakra-ui/icons';
import { IoAdd } from 'react-icons/io'
import { HiOutlineMinus } from 'react-icons/hi'
import { BsCartPlus } from 'react-icons/bs'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { addProductToCart } from '../../Reducers/cartSlice';
import CarouselProduct from '../../Components/CarouselProduct';
import Header from '../../Components/Header'
function ProductDetailUser() {
    let token = localStorage.getItem('grocery_login');
    // state function
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState([]);
    const [productStock, setProductStock] = useState([]);
    const [productImg, setProductImg] = useState([]);
    const [quantity, setQuantity] = useState(null);

    // redux toolkit
    const authSelector = useSelector((state) => state.authUserReducer)
    const cartSelector = useSelector((state) => state.cartSlice)

    console.log("ini isi cart yang di add to cart dari redux: ", cartSelector)

    const dispatch = useDispatch()

    // react router
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // toast from chakra
    const toast = useToast()

    // alert
    const { isOpen, onOpen, onClose } = useDisclosure()

    // fetch product data
    const getProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/detail/${params.id}`)
            console.log('ini hasil dari get response detail', response);

            setProducts(response.data.data[0])
            // console.log('ini dari response.data[0]', response.data.data[0])
            setProductId(response.data.data[0].id)
            // console.log("ini data dari response.data.id", response.data.data[0].id);
            // setProductImg(response.data.data[0].image)
            // console.log('ini gambar dari response: ', response.data.data[0].image)
            setProductStock(response.data.data[0].stockbranches[0].stock)
            // console.log('ini stock jmlh stock nya: ', response.data.data[0].stockBranches[0].stock)

            // const stockProduct = response.data.data[0].stockBranches[0].map((val) => {
            //     return val.stock
            // })
            // let total = 0
            // for (let i = 0; i < stockProduct.length; i++) {
            //     total += Number(stockProduct[i])
            // }
            // setProductStock(total);

            // console.log('total stock', total)

        } catch (error) {
            console.log(error)
        }
    }

    // add to cart
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: productStock,
        })

    const plus = getIncrementButtonProps()
    const minus = getDecrementButtonProps()
    const input = getInputProps()
    const qty = Number(input.value)

    const addToCart = async () => {
        try {
            if (!token) {
                onOpen()
            } else {
                let addToCart = {
                    productId: products?.id,
                    stockBranchId: products?.stockBranchId,
                    quantity: qty,
                }
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/cart/add`, addToCart, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log("ini dari response add to cart", response)

                // dispatch(addProductToCart(response.data.data))

                // console.log("ini yang redux cart nya: ", addProductToCart)

                toast({
                    title: "Added",
                    status: "success",
                    duration: 1000,
                })

                getProduct()
                navigate('/cart/me')
            }
        } catch (err) {
            console.log(err)
            toast({
                title: "Error",
                status: "error",
                duration: 1000,
                description: err.response.data.message,
            })
        }
    }

    // update qty of existed product in cart
    // const updateAddProduct = async () => {
    //     try {
    //         let updateQty = {
    //             quantity
    //         }

    //         await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/cart/addexisting/${productId}`, updateQty)
    //         toast({
    //             title: "added",
    //             status: "success",
    //             duration: 1000
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // rupiah converter function 
    const rupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };
    // validate user 
    const validateUser = () => {
        if (!authSelector.id) {
            onOpen()
        }
    }
    const navigateLogin = () => {
        onClose()
    }

    // rendering 
    useEffect(() => {
        getProduct()
    }, [])

    // useEffect(() => {
    //     addToCart()
    // }, [])

    return (
        <>
            {/* headers */}
            <Box
                my={8}
            >
                <Header />
            </Box>
            <Box
                width={'7xl'}
                mx={'auto'}
            >
                {/* product detail */}
                <Flex
                    flex={'5'}
                    h={'xl'}
                    mt={'4'}
                >
                    <Box
                        flex={'2'}
                        border={'2px'}
                        borderColor={'gray.100'}
                        boxShadow={'md'}
                    >
                        <Box
                        // p={'4'}
                        // m={'auto'}
                        // h='75%'
                        // // boxShadow={'lg'}
                        // mt={'2'}
                        // w='95%'
                        >
                            <Box
                                p={'3'}
                            >
                                {/* image */}
                                <Box
                                    boxSize={'lg'}
                                    objectFit={'cover'}
                                >
                                    <Image src={products?.image} alt='product image' />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        flex={'3'}
                        border={'2px'}
                        borderColor={'gray.100'}
                        ml={'4'}
                        h='72%'
                    >
                        <Stack>

                            {/* product name */}
                            <Text
                                fontSize={'3xl'}
                                fontWeight={'bold'}
                                py={'4'}
                                pl={'8'}
                                color={'blackAlpha.800'}
                            >
                                {products?.name}
                            </Text>
                            {/* availablity (stock) */}
                            <Text
                                fontSize={'sm'}
                                pl={'8'}
                            >
                                Availablity in stock: {productStock}
                            </Text>
                            {/* Product Code */}
                            {/* <Text
                                fontSize={'sm'}
                                pl={'8'}
                            >
                                Product Code: 
                            </Text> */}
                        </Stack>
                        {/* price */}
                        <Text
                            fontSize={'3xl'}
                            pl={'8'}
                            fontWeight={'bold'}
                            mt={'12'}
                            color={'blackAlpha.700'}
                        >
                            {rupiah(products?.price)}
                        </Text>
                        {/* quantity decrement increment */}
                        <HStack
                            mt={'12'}
                        >
                            <Text
                                fontSize={'sm'}
                                px={'4'}
                                pl={'8'}
                            >
                                Quantity:
                            </Text>
                            <HStack alignSelf="center" maxW="320px">
                                <InputGroup>
                                    <InputLeftElement>
                                        <Button
                                            variant="unstyled"
                                            {...minus}
                                        // isDisabled={qty = 1}
                                        >
                                            <MinusIcon
                                                color={qty > 1 ? "#0095DA" : "#c0cada"}
                                                objectFit={'cover'}
                                            />
                                        </Button>

                                    </InputLeftElement>
                                    <Input
                                        width="10em"
                                        textAlign="center"
                                        {...input}
                                        _hover={"none"}
                                        isDisabled={productStock === 0 ? true : false}
                                    />
                                    <InputRightElement>
                                        <Button
                                            isDisabled={productStock <= qty}
                                            {...plus}
                                            variant="unstyled"
                                        >
                                            <AddIcon
                                                color={productStock <= qty ? "#c0cada" : "#0095DA"}
                                            />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </HStack>
                        </HStack>
                        {/* add to cart */}
                        {/* {quantity === null ? ( */}
                        <Button
                            color="white"
                            bg="#6FA66F"
                            size="md"
                            w='90%'
                            mt="12"
                            mx='auto'
                            display={'flex'}
                            justifyItems={'center'}
                            p="4"
                            rounded='none'
                            justifyContent={'center'}
                            _hover={{ boxShadow: 'xl' }}
                            onClick={
                                addToCart
                            }
                        >
                            ADD TO CART
                        </Button>
                    </Box>
                </Flex>
                {/* description */}
                <Box>
                    <Box
                        mt={'8'}
                        bgColor={'#6FA66F'}
                        h={'12'}
                    >
                        <Text
                            color={'#F6F6F6'}
                            fontFamily={'heading'}
                            fontWeight={'bold'}
                            fontSize={'20px'}
                            // textAlign={'center'}
                            pt={'2'}
                            ml={'4'}
                        >
                            DESCRIPTION
                        </Text>
                    </Box>
                    <Box
                        height={'40'}
                        border={'2px'}
                        borderColor={'gray.100'}
                        p={'2'}
                    >
                        <Box
                            bgColor={'#F6F6F6'}
                            w='full'
                            m={'auto'}
                            h={'full'}
                            p={'12'}
                        >
                            {products?.description}
                            || Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero aspernatur porro ducimus iste architecto expedita quis, nobis ab eligendi, modi, illum ut ipsum obcaecati optio. Doloremque voluptatem corrupti aperiam atque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, reprehenderit itaque odit sit ea aspernatur, incidunt minus dolorum deserunt mollitia commodi quis quae distinctio cum unde vel placeat amet nihil.
                        </Box>
                    </Box>
                </Box>

                {/* related product based on category */}
                <Box>
                    <Box
                        mt={'8'}
                        bgColor={'#6FA66F'}
                        h={'12'}
                    >
                        <Text
                            color={'#F6F6F6'}
                            fontFamily={'heading'}
                            fontWeight={'bold'}
                            fontSize={'20px'}
                            // textAlign={'center'}
                            pt={'2'}
                            ml={'4'}
                        >
                            RELATED PRODUCT
                        </Text>
                    </Box>
                    <Box
                        // height={'40'}
                        border={'2px'}
                        borderColor={'gray.100'}
                        p={'2'}
                        mb={'4'}
                    >
                        <Box
                            bgColor={'#F6F6F6'}
                            w='full'
                            m={'auto'}
                            h={'full'}
                            p={'12'}
                        >
                            {/* <CarouselProduct /> */}
                        </Box>
                    </Box>
                </Box>
                {/* user validate modal */}
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    motionPreset={'slideInBottom'}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>You can't add any product to cart!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            You have to Register / Login first to proceed any Transaction. Thank you.
                        </ModalBody>
                        <ModalFooter gap="3">
                            <Link to="/login" replace state={{ from: location }}>
                                <Button
                                    bgColor={'#6FA66F'}
                                    onClick={navigateLogin}
                                    // variant={''}
                                    color={'white'}
                                    rounded={'none'}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    bgColor={'white'}
                                    onClick={navigateLogin}
                                    color={'#6FA66F'}
                                    _hover={'none'}
                                >
                                    Register
                                </Button>
                            </Link>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
}


export default ProductDetailUser;