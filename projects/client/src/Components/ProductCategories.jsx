import React from 'react';
import { Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../helper";



const ProductCategories = ({path, category, categoryId, imageCategory}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product?category=${category}`);
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
            src={imageCategory && (imageCategory.includes('http') || imageCategory.includes('https')) ? imageCategory : `${process.env.REACT_APP_API_IMG_URL}${imageCategory}`}
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
                        {/* Vegetables */}
                        {category}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
     );
}

export default ProductCategories;