import React from 'react';
import { 
    Box, 
    Button, 
    Container, 
    Flex, 
    FormControl, 
    FormLabel, 
    Input, 
    InputGroup, 
    InputRightAddon, 
    Text, 
    Image,
    useBreakpointValue,
    useToast
} from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { API_URL, checkEmail, checkPassword } from '../helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActionAdmin } from '../Reducers/authAdmin';

function AdminLogin() {
    const [visible, setVisible] = React.useState('password');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const boxWidth = useBreakpointValue({base:'full', sm:'full', md:'40%', lg:'40%'});
    const borderRadiusA = useBreakpointValue({base:'none', sm:'3xl', md:'3xl', lg:'3xl'});
    const borderRadiusB = useBreakpointValue({base:'none', sm:'3xl', md:'none', lg:'none'});
    const toast = useToast();

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
        } else {
            setVisible('password');
        }
    }

    const onBtnLogin = async () => {
        try {
            // console.log('adminLogin called');
            if (email == '' || password == '') {
                // alert('Please fill in all form')
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Please fill in both email and password fields.',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkEmail(email)) {
                // return alert('Please enter a valid email address');
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Please enter a valid email address',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkPassword(password)) {
                // return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/auth`, {
                email: email,
                password: password
            });
            if (response.data.length == 0) {
                // alert('Account not found ❌')
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Account not found ❌',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            } else {
                // alert('Login success ✅');
                toast({
                    position: 'bottom',
                    title: 'Login',
                    description: 'Login success ✅',
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                localStorage.setItem('grocery_login', response.data.token);
                dispatch(loginActionAdmin(response.data))
                navigate('/admin', {replace: true})
            }
        } catch (error) {
            console.log(error);
            // alert(error.response.data.message);
            toast({
                position: 'top',
                title: 'Login',
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    return ( 
        <Flex minH={'100vh'} justify={'center'} mt='5' mb='4'>
            <Flex mx="auto" mt='0px' maxH='2xl' maxWidth={'6xl'}>
                <Box w="60%" display={{base:'none', sm:'none', md:'flex', lg:'flex'}}>
                    <Image borderLeftRadius='2xl' w='full' h="full" src='https://images.unsplash.com/photo-1601598851547-4302969d0614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80' alt='Login picture' />
                </Box>
                <Box px='12' py='4' bgGradient='linear(to-b, green.500, green.400)' borderRadius={borderRadiusB} borderRightRadius={borderRadiusA} w={boxWidth}>
                    <Text  fontSize='4xl' fontWeight='bold' color={'white'}>Admin Log In</Text>
                    <FormControl my='2'>
                        <FormLabel color={'white'}>Email</FormLabel>
                        <Input placeholder='Enter your email' backgroundColor={'white'} type='email' onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl my='2'>
                        <FormLabel color={'white'}>Password</FormLabel>
                        <InputGroup>
                            <Input placeholder='Enter your password' backgroundColor={'white'} type={visible} onChange={(e) => setPassword(e.target.value)} />
                            <InputRightAddon onClick={handleVisible}>
                                {
                                    visible == 'password' ?
                                    <AiFillEye/>
                                    :
                                    <AiFillEyeInvisible/>
                                }
                            </InputRightAddon>
                        </InputGroup>
                    </FormControl>
                    <Button my='6' width='full' type='button' backgroundColor={"white"} color="Black" onClick={onBtnLogin}> 
                        Log In
                    </Button>
                </Box>
            </Flex>
        </Flex>
     );
}

export default AdminLogin;