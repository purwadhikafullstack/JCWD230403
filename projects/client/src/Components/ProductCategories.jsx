import React from 'react';
import { 
    Card, 
    CardBody, 
    Stack, 
    Image, 
    Text,
    Box,
    Flex
 } from '@chakra-ui/react';
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
            maxW={'auto'} 
            variant={'outline'} 
            // minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} 
            bgColor='white' 
            borderRadius={{ base: 'lg', sm:'lg', md: 'lg', lg: 'lg' }}
            my={{ base: '2', sm:'2', md: '4', lg: '4' }}
            mx={{ base: '0', sm:'0', md:'2', lg: '2' }}
        >
            <Box
                w={{base: '60vw', sm:'30vw', md:'30vw', lg: '20vw'}}
                h={'auto'}
            >
                <Flex
                    flexDir={'column'}
                    justifyContent={'space-between'}
                >
                    <Image 
                    src={imageCategory && (imageCategory.includes('http') || imageCategory.includes('https')) ? imageCategory : `${process.env.REACT_APP_API_IMG_URL}${imageCategory}`}
                    alt='Category picture'
                    borderTopRadius={{ base: 'lg', sm:'lg', md: 'lg', lg: 'lg' }}
                    // objectFit='cover'
                    // w='full'
                    h={{ base: '150px', sm: "160px", md: '170px', lg: '170px'}}
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
                </Flex>
            </Box>
        </Card>
     );
}

export default ProductCategories;