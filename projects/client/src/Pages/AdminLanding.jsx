import React from 'react';
import { 
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Grid, 
  GridItem
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {BsPersonVcard, BsFillBoxSeamFill} from 'react-icons/bs';
import {MdDiscount} from 'react-icons/md';
import {BiTransfer} from 'react-icons/bi';
import {HiOutlinePresentationChartLine} from 'react-icons/hi';


function AdminLanding() {
  const name = useSelector((state) => state.authAdminReducer.name);
    return ( 
      <Flex
        w={{base:'100%', sm:'100%', md:'90%', lg:'90%', xl:'85%'}}
        pt={{base:'4%', sm:'4%', md:'3%', lg:'2.5%'}}
        pl={{base:'4', sm:'4', md:'6', lg:'8'}}
        flexDir='column'
        overflow='auto'
        minH='100vh'
        alignItems= 'start'
      >
        <Heading fontSize='xl' letterSpacing={'tight'} fontWeight={'normal'}>Welcome, <Flex display={'inline-flex'} fontWeight={'bold'}>{name}</Flex></Heading>
        
      </Flex>
     );
}

export default AdminLanding;