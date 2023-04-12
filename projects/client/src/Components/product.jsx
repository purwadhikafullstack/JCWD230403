import React from 'react';
import { Card, CardBody, Image, Stack, Heading } from '@chakra-ui/react';

function Products(props) {

  return (

    <Card cursor="pointer" maxW={'3xl'} variant={'outline'} minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} bgColor='white' borderRadius={{ base: 'xl', md: '3xl' }} my={{ base: '2', md: '4' }} mx={{ base: '0', lg: '1' }}>
            <Image 
            src={props.productimage}
            alt='Category picture'
            borderTopRadius={{ base: 'lg', md: '3xl' }}
            objectFit='cover'
            w='full'
            h={200}
            />
            <CardBody>
                <Stack mt={{ base: '2', sm: '6' }} spacing='3'>
                    <Heading size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>{props.name}</Heading>
                </Stack>
                <Stack mt={{ base: '2', sm: '1' }} spacing='3'>
                    <Heading size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>${props.price}</Heading>
                </Stack>
                <Stack mt={{ base: '2', sm: '1' }} spacing='3'>
                    <Heading size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>{props.stock}</Heading>
                </Stack>
            </CardBody>
        </Card>

  )

};

export default Products;