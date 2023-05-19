import React from 'react';
import { Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";



const ProductCategories = ({path}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    }


    return ( 
        <Card 
            onClick={handleClick} 
            cursor="pointer" 
            maxW={'sm'} 
            variant={'outline'} 
            minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} 
            bgColor='white' 
            borderRadius={{ base: 'lg', sm:'lg', md: 'lg', lg: 'lg' }}
            my={{ base: '2', md: '4' }} 
            mx={{ base: '0', lg: '1' }}
        >
            <Image 
            src='https://images.unsplash.com/photo-1598278242809-6c21ee17aef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' 
            alt='Category picture'
            borderTopRadius={{ base: 'lg', sm:'lg', md: 'lg', lg: 'lg' }}
            objectFit='cover'
            w='full'
            h={{ base: 'auto', sm: "auto", md: 'auto' }}
            />
            <CardBody>
                <Stack 
                    mt={{ base: '2', sm: '6' }} 
                    spacing='3'
                >
                    <Text 
                        size={{ base: 'sm', sm: 'md' }} 
                        fontSize={{base:'sm', sm:'md', md:'lg'}} 
                        fontWeight={'semibold'}
                    >
                        Vegetables
                    </Text>
                </Stack>
            </CardBody>
        </Card>
     );
}

export default ProductCategories;