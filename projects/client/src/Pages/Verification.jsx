import React from 'react';
import { 
    Box, 
    Button, 
    Stack, 
    Text,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';

function Verification() {
    const params = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const onBtonVerify = async () => {
        try {
            let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${params.token}`
                }
            });
            // alert(response.data.message);
            toast({
                position: 'bottom',
                title: 'Verification',
                description: response.data.message,
                status: 'success',
                duration: 2000,
                isClosable: true
            })
            navigate('/login');
        } catch (error) {
            console.log(error);
            // alert(error.response.data.message);
            toast({
                position: 'top',
                title: 'Verification',
                description: error.response.data.message,
                status: 'warning',
                duration: 2000,
                isClosable: true
            });
            navigate('/login');
        }
    }

    return ( 
        <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} pb={{base:'56', lg:'40'}} >
            <Stack width={{base:'90%', sm:'80%', md:'60%', lg:'50%'}}>
                <Box py={'4'}>
                    <Text fontSize={'2xl'}>Thanks for signing up!</Text>
                    <Text>Verify Your Account</Text>
                </Box>
                <Box>
                    <Text pb='4' fontSize={'lg'}>Welcome! You're almost ready to start shopping with us. Please verify your account by clicking the button below. Happy shopping!</Text>
                </Box>
                <Box>
                    <Button color={'white'} bgGradient='linear(to-b, green.500, green.400)' _hover={{ bgGradient:'linear(to-b, green.700, green.600)' }} onClick={onBtonVerify}>Verify my account</Button>
                </Box>
            </Stack>
        </Box>
     );
}

export default Verification;