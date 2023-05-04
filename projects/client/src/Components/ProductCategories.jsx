import React from 'react';
import { Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";



const ProductCategories = ({path}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    }


    return ( 
        <Card onClick={handleClick} cursor="pointer" maxW={'sm'} variant={'outline'} minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} bgColor='white' borderRadius={{ base: 'xl', md: '3xl' }} my={{ base: '2', md: '4' }} mx={{ base: '0', lg: '1' }}>
            <Image 
            src='https://images.unsplash.com/photo-1527960471264-932f39eb5846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' 
            alt='Category picture'
            borderTopRadius={{ base: 'lg', md: '3xl' }}
            objectFit='cover'
            w='full'
            h={{ base: '20', sm: "40", md: '44' }}
            />
            <CardBody>
                <Stack mt={{ base: '2', sm: '6' }} spacing='3'>
                    <Text size={{ base: 'sm', sm: 'md' }} fontSize={'lg'} fontWeight={'semibold'}>Beverage</Text>
                </Stack>
            </CardBody>
        </Card>
     );
}

export default ProductCategories;