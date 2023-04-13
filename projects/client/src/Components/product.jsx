import React, { useState } from 'react';
import { Card, CardBody, Image, Stack, Heading } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';

function Products({name, productimage, price, productId, stock}) {
    const navigate = useNavigate();
    // const params = useParams();
    // const [product, setProduct] = useState([]);

    // const getDetailProduct = async () => {
    //     try {
    //         let response = await axios.get(`${API_URL}/product/detail/${params.id}`)
    //         console.log("ini data dari response getDetailProduct", response)
    //         setProduct(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (

    <Card cursor="pointer" maxW={'3xl'} variant={'outline'} minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} bgColor='white' borderRadius={{ base: 'xl', md: '3xl' }} my={{ base: '2', md: '4' }} mx={{ base: '0', lg: '1' }}
        // onClick={() => navigate(`/detail/:id`)}
        // onClick={() => navigate(`/detail/${params.id}`)}
        onClick={() => navigate(`/detail/${productId}`)}
    >
            <Image 
            src={productimage}
            alt='Category picture'
            borderTopRadius={{ base: 'lg', md: '3xl' }}
            objectFit='cover'
            w='full'
            h={200}
            />
            <CardBody>
                <Stack mt={{ base: '2', sm: '6' }} spacing='3'>
                    <Heading size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>{name}</Heading>
                </Stack>
                <Stack mt={{ base: '2', sm: '1' }} spacing='3'>
                    <Heading size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>${price}</Heading>
                </Stack>
                <Stack mt={{ base: '2', sm: '1' }} spacing='3'>
                    <Heading size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>{stock}</Heading>
                </Stack>
            </CardBody>
        </Card>

  )

};

export default Products;