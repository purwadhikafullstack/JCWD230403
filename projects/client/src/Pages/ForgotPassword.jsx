import React from 'react';
import { 
    Box, 
    Button,
    FormControl, 
    FormLabel, 
    Input, 
    InputGroup, 
    InputRightAddon, 
    Text,
    useBreakpointValue,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const boxWidth = useBreakpointValue({base:'full', sm:'full', md:'40%', lg:'40%'});
    const borderRadius = useBreakpointValue({base:'none', sm:'xl', md:'2xl', lg:'2xl'});
    const toast = useToast();

    const onBtnForgot = async () => {
        try {
            if (email == '') {
                return toast({
                    position: 'top',
                    title: 'Forgot Password',
                    description: 'Please enter a valid email address',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            } else {
                let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/forgot`, {
                    email: email
                });
                if (response.data.success) {
                    toast({
                        position: 'bottom',
                        title: 'Forgot Password',
                        description: response.data.message,
                        status: 'info',
                        duration: 2000,
                        isClosable: true
                    })
                    navigate('/login');
                }
            }
        } catch (error) {
            console.log(error);
            console.log('ini error dari forget password :', error.response.data);
            console.log('ini error dari forget password message :', error.response.data.message);
            toast({
                position: 'bottom',
                title: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    return ( 
        <Box px={{base:'none', sm:'16' ,md:'16',lg:'16'}} pb={{base:'64', sm:'64', md:'64',lg:'48'}} display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <Box my='10' px='8' py='4' bgGradient='linear(to-b, green.500, green.400)' borderRadius={borderRadius} w={boxWidth}>
            <Text  fontSize='xl' fontWeight='bold' color={'white'}>Enter your email</Text>
                <FormControl my='2'>
                    <FormLabel color={'white'}>Email</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter your email' backgroundColor={'white'} onChange={(e) => setEmail(e.target.value)}/>
                    </InputGroup>
                </FormControl>
                <Button my='6' width='40%' type='button' backgroundColor={"white"} color="Black" onClick={onBtnForgot}> 
                    Send Request
                </Button>
            </Box>
        </Box>
     );
}

export default ForgotPassword;