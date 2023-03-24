import React from 'react';
import { 
    Container,
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    InputRightElement,
    InputGroup,
    Link,
    Box
 } from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
import { BsCart2 } from 'react-icons/bs';

function Navbar() {
    return ( 
    <Container maxW={'full'} px={{base:'4', sm:'8', md:'12', lg:'24'}} bgGradient='linear(to-b, orange.500, orange.400)'>
        <Flex py={'3'} alignItems={'Center'} justifyContent={'space-between'}>
            <Flex>
                <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'xl', md:'xl', lg:'3xl'}} fontWeight='semibold' color={'white'}>Grocery</Link>
            </Flex>
            <InputGroup width={'50%'} size={'md'}>
                <Input pr={'2.75rem'}  placeholder='search' size="sm" type={'search'} rounded={'lg'} backgroundColor={'white'}/>
                <InputRightElement h={'2rem'}>
                    <Button borderLeftRadius={'0'} h={'2rem'} size={'sm'}>
                        <GoSearch size={'sm'}/>
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Flex alignItems={'Center'} gap={'1'}>
                <Flex
                display={['none', 'none','flex', 'flex']} alignItems={'center'}
                >
                    <Box>
                        <Link p={'2'} textDecoration={'none'} _hover={{ textDecoration: "none", rounded:'lg' }} fontSize={{base:'xl', md:'xl', lg:'2xl'}} fontWeight='semibold' color={'white'}>Sign Up</Link>
                        <Link p={'2'} textDecoration={'none'} _hover={{ textDecoration: "none", rounded:'lg' }} fontSize={{base:'xl', md:'xl', lg:'2xl'}} fontWeight='semibold' color={'white'}>Login</Link>
                    </Box>
                    <Link variant={'outline'} backgroundColor={'transparent'} border={'none'} color={'white'} fontSize={{base:'xl', md:'xl', lg:'2xl'}} p='1'>
                        <BsCart2/>
                    </Link>
                </Flex>
                <Flex display={['flex', 'flex', 'none', 'none']} alignItems={'center'} gap={'1'}>
                    <Menu>
                        <MenuButton as={Button} variant={'outline'} rounded={'lg'} size={'sm'} color={'orange.400'} backgroundColor={'white'}>
                          <AiOutlineMenu/>
                        </MenuButton>
                        <MenuList>
                          <MenuItem type='button'>Sign Up</MenuItem>
                          <MenuItem type='button'>Login</MenuItem>
                        </MenuList>
                    </Menu>
                    <Link variant={'outline'} backgroundColor={'transparent'} border={'none'} color={'white'} fontSize={{base:'xl', md:'xl', lg:'2xl'}} p='1'>
                        <BsCart2/>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    </Container> );
}

export default Navbar;