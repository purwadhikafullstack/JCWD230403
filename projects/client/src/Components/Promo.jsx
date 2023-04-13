import React from 'react';
import { Box, Image, VStack, Link, Text } from '@chakra-ui/react';

function Promo() {
    return ( 
    // <Box width={{ base: "auto", sm: "100%", md: "100%", lg: "100%" }} height={{ base: "auto", sm: "auto", md: "50vh", lg: "60vh" }} px={{ base: "4", sm: "8", md: "12", lg: "20" }} py={{ base: "2", sm: "4", md: "4", lg: "4" }} mb={'32'} backgroundColor={'white'}>
    //     <Image objectFit={{base:'cover', lg:'cover'}} w={'100vw'} h={{base:'auto',lg:'75vh'}}  src='https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'></Image>
    // </Box> 
    <Box 
      width={{ base: "auto", sm: "100%", md: "100%", lg: "100%" }} 
      height={{ base: "auto", sm: "auto", md: "50vh", lg: "60vh" }} 
      px={{ base: "4", sm: "8", md: "12", lg: "20" }} 
      py={{ base: "2", sm: "4", md: "4", lg: "4" }} 
      backgroundColor="white"
    >
      <Image 
        objectFit={{base:'cover', lg:'cover'}}
        w="100%" 
        h="100%" 
        src="https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
      />
    </Box>
    );
}

export default Promo;