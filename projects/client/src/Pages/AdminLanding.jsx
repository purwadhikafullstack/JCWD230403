import React from 'react';
import { 
    Container,
    Box,
    Link,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    Card,
    CardBody
 } from '@chakra-ui/react';
import {BsPersonVcard, BsFillBoxSeamFill} from 'react-icons/bs';
import {MdDiscount} from 'react-icons/md';
import {BiTransfer} from 'react-icons/bi';
import {HiOutlinePresentationChartLine} from 'react-icons/hi';


function AdminLanding() {
    return ( 
        <Card pt='2' pb={{base:'36',lg:'10'}}>
          <CardBody bgGradient='linear(to-b, green.500, green.400)' mt={'4'}>
            <Flex alignItems={'center'} justifyContent='start' ml={{base:'9', lg:'20'}} gap={'7'}>
                <Box color='white' fontSize={'2xl'}>
                    <BsPersonVcard/>
                </Box>
            <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'xl', md:'xl', lg:'xl'}} fontWeight='semibold' color={'white'}>Account Management</Link>
            </Flex>
          </CardBody>
          <CardBody bgGradient='linear(to-b, green.500, green.400)' mt={'4'}>
            <Flex alignItems={'center'} justifyContent='start' ml={{base:'9', lg:'20'}} gap={'7'}>
                <Box color='white' fontSize={'2xl'}>
                    <BsFillBoxSeamFill/>
                </Box>
            <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'xl', md:'xl', lg:'xl'}} fontWeight='semibold' color={'white'}>Product Management</Link>
            </Flex>
          </CardBody>
          <CardBody bgGradient='linear(to-b, green.500, green.400)' mt={'4'}>
            <Flex alignItems={'center'} justifyContent='start' ml={{base:'9', lg:'20'}} gap={'7'}>
                <Box color='white' fontSize={'2xl'}>
                    <MdDiscount/>
                </Box>
            <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'xl', md:'xl', lg:'xl'}} fontWeight='semibold' color={'white'}>Discount</Link>
            </Flex>
          </CardBody>
          <CardBody bgGradient='linear(to-b, green.500, green.400)' mt={'4'}>
            <Flex alignItems={'center'} justifyContent='start' ml={{base:'9', lg:'20'}} gap={'7'}>
                <Box color='white' fontSize={'2xl'}>
                    <BiTransfer/>
                </Box>
            <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'xl', md:'xl', lg:'xl'}} fontWeight='semibold' color={'white'}>Transaction</Link>
            </Flex>
          </CardBody>
          <CardBody bgGradient='linear(to-b, green.500, green.400)' mt={'4'}>
            <Flex alignItems={'center'} justifyContent='start' ml={{base:'9', lg:'20'}} gap={'7'}>
                <Box color='white' fontSize={'2xl'}>
                    <HiOutlinePresentationChartLine/>
                </Box>
            <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'xl', md:'xl', lg:'xl'}} fontWeight='semibold' color={'white'}>Report</Link>
            </Flex>
          </CardBody>
        </Card>
     );
}

export default AdminLanding;