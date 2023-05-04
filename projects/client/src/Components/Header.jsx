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
    Image,
    Box,
    Spacer,
    useMediaQuery,
    Text
} from '@chakra-ui/react';
import { GoSearch } from 'react-icons/go';
import { BsCart3 } from 'react-icons/bs';
import logo from '../Asset/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()

    return (
        <Box py='2'>
            <Box display={['block', 'block', 'none', 'none']} px={{ base: '4', sm: '4', md: 'none', lg: 'none' }}>
                <Flex alignItems={'center'}>
                    <Box w="200px" h="100px">
                        <Image src={logo}></Image>
                    </Box>
                    <Spacer />
                    <Link variant={'outline'} backgroundColor={'none'} border={'none'} fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} p='1' mx='0'>
                        <BsCart3 />
                    </Link>
                </Flex>
                <InputGroup size={'md'}>
                    <Input pr={'2.75rem'} placeholder='search' size="sm" type={'search'} rounded={'lg'} backgroundColor={'white'} />
                    <InputRightElement h={'2rem'}>
                        <Button borderLeftRadius={'0'} h={'2rem'} size={'sm'}>
                            <GoSearch size={'sm'} />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Box display={['none', 'none', 'block', 'block']} px={{ base: 'none', sm: 'none', md: '20', lg: '20' }}>
                <Flex alignItems={'Center'} justifyContent={'space-between'} >
                    <Box w="200px" h="100px">
                        <Image src={logo}></Image>
                    </Box>
                    <InputGroup size={'md'} width={'50%'}>
                        <Input pr={'2.75rem'} placeholder='search' size="sm" type={'search'} rounded={'lg'} backgroundColor={'white'} />
                        <InputRightElement h={'2rem'}>
                            <Button borderLeftRadius={'0'} h={'2rem'} size={'sm'}>
                                <GoSearch size={'sm'} />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Link
                        variant={'outline'} _hover={{ textDecoration: 'none' }} p='2'
                    >
                        <Flex
                            alignItems='start'
                            gap='2'
                            onClick={() => navigate('/cart/me')}
                        >
                            <Box
                                fontSize={{ base: '3xl', md: '4xl', lg: '4xl' }}
                            >
                                <BsCart3
                                />
                            </Box>
                            <Text
                                color={'green.500'}
                            >
                                Shopping Cart</Text>
                        </Flex>
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
}

export default Header;