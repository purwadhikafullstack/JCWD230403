import React from 'react';
import Promo from '../Components/Promo';
import ProductCategories from '../Components/ProductCategories';
import ProductSuggestions from '../Components/ProductSuggestions';
import Footer from '../Components/Footer';
import { Flex, Heading, Box } from '@chakra-ui/react';
import Header from '../Components/Header';

function Landing() {
    return ( <div>
        <Header/>
        <Promo/>
        <Box py={'8'} mt='8' px={'2'} backgroundColor={'whitesmoke'}>
            <Heading fontSize={'xl'}>Categories</Heading>
            <Flex maxW='6xs' flexWrap='wrap' justifyContent='center' gap={'2'} alignItem='start'>
                <ProductCategories/>
                <ProductCategories/>
                <ProductCategories/>
                <ProductCategories/>
                <ProductCategories/>
                <ProductCategories/>
            </Flex>
        </Box>
        <Box py={'8'} px={'2'} backgroundColor={'whitesmoke'}>
            <Heading fontSize={'xl'}>Popular Product</Heading>
            <Flex maxW='6xs' flexWrap='wrap' justifyContent='center' gap={'2'} alignItem='start'>
                <ProductSuggestions/>
                <ProductSuggestions/>
                <ProductSuggestions/>
                <ProductSuggestions/>
                <ProductSuggestions/>
                <ProductSuggestions/>
            </Flex>
        </Box>
    </div> );
}

export default Landing;