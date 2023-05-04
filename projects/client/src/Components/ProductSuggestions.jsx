import React from 'react';
import {
    Text,
    Card,
    CardBody,
    Stack,
    Image,
  } from '@chakra-ui/react';

function ProductSuggestions() {
    return ( 
        <Card maxW={'sm'} variant={'outline'} minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} bgColor='white' borderRadius={{ base: 'xl', md: '3xl' }} my={{ base: '2', md: '4' }} mx={{ base: '0', lg: '1' }}>
            <Image 
            src='https://images.unsplash.com/photo-1527960392543-80cd0fa46382?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80' 
            alt='Product Picture'
            borderTopRadius={{ base: 'xl', md: '3xl' }}
            objectFit='cover'
            w='full'
            h={{ base: '20', sm: "40", md: '44' }}
            />
            <CardBody>
                <Stack mt={{ base: '2', sm: '2' }} spacing='3'>
                    <Text size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>Cola</Text>
                </Stack>
            </CardBody>
        </Card>
     );
}

export default ProductSuggestions;