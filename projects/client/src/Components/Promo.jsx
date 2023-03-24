import React from 'react';
import { Box, Image } from '@chakra-ui/react';

function Promo() {
    return ( 
    <Box width={{base: 'auto', md:'100vw', lg:'100vw'}} height={'auto'} px={{base:'4', sm:'8', md:'12', lg:'20'}} py={{base:'2', sm:'4', md:'4', lg:'4'}} backgroundColor={'white'}>
        <Image objectFit='initial' w={'100vw'} h={{base:'auto',lg:'75vh'}}  src='https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'></Image>
    </Box> );
}

export default Promo;