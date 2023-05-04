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
} from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const boxWidth = useBreakpointValue({base:'full', sm:'full', md:'40%', lg:'40%'});
    const borderRadius = useBreakpointValue({base:'none', sm:'xl', md:'2xl', lg:'2xl'});

    const onBtnForgot = async () => {
        try {
            if (email == '') {
                alert("Please enter your email")
            } else {
                let response = await axios.post(`${API_URL}/user/forgot`, {
                    email: email
                });
                if (response.data.success) {
                    alert(response.data.message);
                    navigate('/login');
                }
            }
        } catch (error) {
            console.log(error);
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