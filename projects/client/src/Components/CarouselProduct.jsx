import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    Button,
    ButtonGroup,
    HStack,
    Box,
    Flex
} from '@chakra-ui/react';
import Carousel from "react-multi-carousel";
import Products from "./product";
import { useState } from "react";
import axios from "axios";
import product from './product'
function CarouselProduct() {

    // responsive template from lib
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    // state functional
    const [data, setData] = useState([]);

    // get product card
    // const productData = async (req, res) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8000/api/product`)

    //         setData(response.data.data) 
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    // const products = data.map(val => (
    //     <Products name={val.name} url={val.image} price={val.price} description={val.description}/>
    // ))

    return (
        <>
            <Carousel responsive={responsive}>
                {/* <Flex flexDir={'row'}>
                    <Card
                        maxW={'sm'}
                        mx={'3'}
                    >
                        <CardBody>
                            <Image
                                src=''
                                alt='image product'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>buah</Heading>
                                <Text>
                                    segar
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    20.000
                                </Text>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' bg="#6FA66F">
                                    Add to cart
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card
                        maxW={'md'}
                    >
                        <CardBody>
                            <Image
                                src=''
                                alt='image product'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>buah</Heading>
                                <Text>
                                    segar
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    20.000
                                </Text>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' bg="#6FA66F">
                                    Add to cart
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Flex> */}

            </Carousel>
        </>
    );
}

export default CarouselProduct;