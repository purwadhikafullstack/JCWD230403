import React, { useState } from 'react';
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
    Text,
    Select
} from '@chakra-ui/react';
import { GoSearch } from 'react-icons/go';
import { BsCart3 } from 'react-icons/bs';
import logo from '../Asset/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBranch } from '../Reducers/authUser';
import { useLocation } from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    let token = localStorage.getItem('grocery_login');
    const dispatch = useDispatch();
    const branch = useSelector((state) => state.authUserReducer.branchId);
    const location = useLocation();
    const currentUrl = location.pathname;

    // --- GET ADDRESS USER --- //
    const[userAddress, setUserAddress] = useState([])
    const getUserAddress = async () => {
        try {
            let response = await axios.get(`${API_URL}/address/useraddress/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserAddress(response.data.data)
            console.log('Data from user address in header :', response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getUserAddress();
    }, [])

    // --- SELECTED ADDRESS BY USER --- //
    const handleAddressChange = (event) => {
        dispatch(setActiveBranch(event.target.value))
      };

    return (
        <Flex
            flexDir={'column'}
        >
            {
                token && currentUrl !== "/detail/undefined" ? (
                    <Box 
                        pt={'1.5'}
                        px={{ base: '4', sm: '8', md: '20', lg: '20' }}
                    >
                        <Flex
                            gap={'2'}
                            alignItems={'baseline'}
                        >
                            <Text 
                                fontSize={{base: 'xs', sm:'sm'}} 
                                color={'gray.500'}
                                letterSpacing={'tighter'}
                            >
                                Address:
                            </Text>
                            <Box>
                            <Select 
                              size={'xs'} 
                              variant={'unstyled'}
                              icon={'none'}
                              value={branch}
                              onChange={handleAddressChange}
                              letterSpacing={'tighter'}
                            >
                              {userAddress.map((address) => {
                                return (
                                  <option 
                                    key={address.id}
                                    value={address.branchId}
                                  >
                                    {address.addressLine}, {''}
                                    {address.subDistrict}, {''}
                                    {address.province}, {''}
                                    {address.city}
                                  </option>
                                );
                              })}
                            </Select>
                            </Box>
                        </Flex>
                    </Box>) : null
            }
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
        </Flex>
    );
}

export default Header;