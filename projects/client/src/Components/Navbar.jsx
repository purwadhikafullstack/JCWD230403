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
    Text
 } from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutActionAdmin } from '../Reducers/authAdmin';
import { logoutActionUser } from '../Reducers/authUser';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nameAdmin = useSelector((state) => state.authAdminReducer.name);
    const nameUser = useSelector((state) => state.authUserReducer.name);
    const name = nameAdmin || nameUser

    const roleIdAdmin = useSelector((state) => state.authAdminReducer.roleId);
    const roleIdUser = useSelector((state) => state.authUserReducer.roleId);
    const roleId = roleIdAdmin || roleIdUser

    const logoutBtn = () => {
        localStorage.removeItem('grocery_login');
        dispatch(logoutActionAdmin());
        dispatch(logoutActionUser());
    }
    

    return ( 
    <Container maxW={'full'} px={{base:'2', sm:'6', md:'10', lg:'24'}} bgGradient='linear(to-b, orange.500, orange.400)'>
        <Flex py={'3'} alignItems={'Center'} justifyContent={'space-between'}>
            <Link textDecoration={'none'} _hover={{ textDecoration: "none" }} fontSize={{base:'lg', md:'xl', lg:'3xl'}} fontWeight='semibold' color={'white'} onClick={() => navigate('/')}>FreshFinds</Link>
            {
                name ? 
                (roleId == 3 ?
                <Flex alignItems={'Center'} gap={{base:'1', sm:'1', md:'5', lg:'5'}} justifyContent='space-between' width={{md:'md', lg:'6xl'}} px={{base:'1', sm:'2', md:'10', lg:'10'}}>
                    <InputGroup size={'md'}>
                        <Input pr={'2.75rem'}  placeholder='search' size="sm" type={'search'} rounded={'lg'} backgroundColor={'white'}/>
                        <InputRightElement h={'2rem'}>
                            <Button borderLeftRadius={'0'} h={'2rem'} size={'sm'}>
                                <GoSearch size={'sm'}/>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Link variant={'outline'} backgroundColor={'transparent'} border={'none'} color={'white'} fontSize={{base:'xl', md:'xl', lg:'2xl'}} p='1' mx='0'>
                        <BsCart2/>
                    </Link>
                </Flex>
                :
                null)
                :
                <Flex alignItems={'Center'} gap={{base:'1', sm:'1', md:'5', lg:'5'}} justifyContent='space-between' width={{md:'md', lg:'2xl'}} pl={{base:'2',lg:'16'}}>
                    <InputGroup size={'md'}>
                        <Input pr={'2.75rem'}  placeholder='search' size="sm" type={'search'} rounded={'lg'} backgroundColor={'white'}/>
                        <InputRightElement h={'2rem'}>
                            <Button borderLeftRadius={'0'} h={'2rem'} size={'sm'}>
                                <GoSearch size={'sm'}/>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Link variant={'outline'} backgroundColor={'transparent'} border={'none'} color={'white'} fontSize={{base:'xl', md:'xl', lg:'2xl'}} p='1' mx='3'>
                        <BsCart2/>
                    </Link>
                </Flex>
            }
            {
                name ? 
                <Flex alignItems={'Center'} gap={'1'}>
                    <Flex
                    display={['none', 'none','flex', 'flex']} alignItems={'center'} ml='1'
                    >
                        <Menu>
                          <MenuButton>
                            <Text color='white' p={'1'} fontSize='2xl' fontWeight={'semibold'}>{name}</Text>
                          </MenuButton>
                          <MenuList>
                            <MenuItem type='button' onClick={() => {logoutBtn(); {navigate('/login', { replace:true})}}}>Logout</MenuItem>
                          </MenuList>
                        </Menu>
                    </Flex>
                    <Flex display={['flex', 'flex', 'none', 'none']} alignItems={'center'} ml='1'>
                        <Menu>
                          <MenuButton>
                            <Text color='white' p={'1'} fontSize='xl' fontWeight={'semibold'}>{name}</Text>
                          </MenuButton>
                          <MenuList>
                            <MenuItem type='button' onClick={() => {logoutBtn(); {navigate('/login', { replace:true})}}}>Logout</MenuItem>
                          </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                :
                <Flex alignItems={'Center'} gap={'1'}>
                    <Flex
                    display={['none', 'none','flex', 'flex']} alignItems={'center'}
                    w='auto'
                    >
                        <Link p={'1'} mr='2' textDecoration={'none'} _hover={{ textDecoration: "none", rounded:'lg' }} fontSize={{base:'xl', md:'xl', lg:'2xl'}} fontWeight='semibold' color={'white'} onClick={() => navigate('/register')}>SignUp</Link>
                        <Link p={'1'} textDecoration={'none'} _hover={{ textDecoration: "none", rounded:'lg' }} fontSize={{base:'xl', md:'xl', lg:'2xl'}} fontWeight='semibold' color={'white'} onClick={() => navigate('/login')}>Login</Link>
                    </Flex>
                    <Flex display={['flex', 'flex', 'none', 'none']} alignItems={'center'} gap={'1'}>
                        <Menu>
                            <MenuButton as={Button} variant={'outline'} rounded={'lg'} size={'sm'} color={'orange.400'} backgroundColor={'white'}>
                              <AiOutlineMenu/>
                            </MenuButton>
                            <MenuList>
                              <MenuItem type='button' onClick={() => navigate('/register')}>Sign Up</MenuItem>
                              <MenuItem type='button' onClick={() => navigate('/login')}>Login</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            }
        </Flex>
    </Container> );
}

export default Navbar;