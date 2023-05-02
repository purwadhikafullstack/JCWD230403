import React from 'react';
import {
    Box,
    Text
  } from '@chakra-ui/react';

function CategoryManagement() {
    return ( 
        <Box
            w={{base:'100%', sm:'100%', md:'90%', lg:'90%', xl:'85%'}}
            p='2%'
            flexDir='column'
            overflow='auto'
            minH='100vh'
        >
            <Text>Category Management Page</Text>
        </Box>
     );
}

export default CategoryManagement;