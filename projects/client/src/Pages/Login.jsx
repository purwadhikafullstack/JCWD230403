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
    Link,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { API_URL, checkEmail, checkPassword } from '../helper';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActionUser } from '../Reducers/authUser';
import userlogin from '../Asset/userlogin.png';


function Login() {
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
            if (email == '' || password == '' ) {
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Please fill in both email and password fields.',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if (!checkEmail(email)) {
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Please enter a valid email address',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            } 
            if (!checkPassword(password)) {
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/auth`, {
                email: email,
                password: password
            });
            if (response.data.length == 0) {
                return toast({
                    position: 'top',
                    title: 'Login',
                    description: 'Account not found',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            } else {
                toast({
                    position: 'bottom',
                    title: 'Login',
                    description: 'Login success',
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                });
                localStorage.setItem('grocery_login', response.data.token);
                dispatch(loginActionUser(response.data))
                navigate('/', {replace: true})
            }
            
        } catch (error) {
            console.log(error);
            toast({
                position: 'top',
                title: 'Login',
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true
            });
            const toastMessages = [
              { index: 0, title: "Status", duration: 2000 },
              { index: 1, title: "Status", duration: 2000 },
              { index: 3, title: "Status", duration: 2000 }
            ];
        
            for (const toastMsg of toastMessages) {
              const errorMsg = error.response.data.error[toastMsg.index]?.msg;
              if (errorMsg) {
                toast({
                  position: 'top',
                  title: toastMsg.title,
                  description: errorMsg,
                  status: 'error',
                  duration: toastMsg.duration,
                  isClosable: true
                });
              }
            }
        }
    }

    return ( 
        <Flex minH={'100vh'} justify={'center'} mt='5' mb='4'>
            <Flex mx="auto" mt='0px' maxH='2xl' maxWidth={'6xl'}>
                <Box w="60%" display={{base:'none', sm:'none', md:'flex', lg:'flex'}}>
                    <Image borderLeftRadius='2xl' w='full' h="full" src={userlogin} alt='Login picture' />
                </Box>
                <Box px='12' py='4' bgGradient='linear(to-b, green.500, green.400)' borderRadius={borderRadiusB} borderRightRadius={borderRadiusA} w={boxWidth}>
                    <Text  fontSize='4xl' fontWeight='bold' color={'white'}>Log In</Text>
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
                    <Flex py='2' fontSize='sm' justifyContent={'end'} color='white' gap={'1.5'}>
                        <Text>Forget Password?</Text>
                        <Link _hover={{ color:'gray.300' }} onClick={() => navigate('/forgetpassword')}>click here</Link>
                    </Flex>
                    <Button my='6' width='full' type='button' backgroundColor={"white"} color="Black" onClick={onBtnLogin}> 
                        Log In
                    </Button>
                </Box>
            </Flex>
        </Flex>
     );
}

export default Login;