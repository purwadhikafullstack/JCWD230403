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
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { API_URL, checkPassword } from '../helper';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const params = useParams();
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState('password');
    const [password, setPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');
    const boxWidth = useBreakpointValue({base:'full', sm:'full', md:'40%', lg:'40%'});
    const borderRadius = useBreakpointValue({base:'none', sm:'xl', md:'2xl', lg:'2xl'});
    const toast = useToast();

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
        } else {
            setVisible('password');
        }
    }

    const onBtnReset = async () => {
        try {
            if(password == '' || confirmationPassword == ''){
                // return alert('Please fill in all fields');
                return toast({
                    position: 'top',
                    title: 'Reset Password',
                    description: 'Please fill in both password and confirmation password fields.',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if(!checkPassword(password)){
                // return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
                return toast({
                    position: 'top',
                    title: 'Reset Password',
                    description: 'Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if(!checkPassword(confirmationPassword)){
                // return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
                return toast({
                    position: 'top',
                    title: 'Reset Password',
                    description: 'Please enter confirmation password at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/new-password`, {
                password: password,
                confirmationPassword: confirmationPassword
            }, {
                headers: {
                    Authorization: `Bearer ${params.token}`
                }
            });
            if (response.data.success) {
                // alert(response.data.message);
                toast({
                    position: 'bottom',
                    title: 'Reset Password',
                    description: response.data.message,
                    status: 'info',
                    duration: 2000,
                    isClosable: true
                });
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            // alert(error.response.data.error[1].msg);
            // alert(error.response.data.error[3].msg);
            // alert(error.response.data.error[5].msg);
            const toastMessages = [
                { index: 1, title: "Status", duration: 2000 },
                { index: 3, title: "Status", duration: 2000 },
                { index: 5, title: "Status", duration: 2000 }
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
        <Box pb={{base:'64',lg:'48'}} display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <Box my='10' px='8' py='4' bgGradient='linear(to-b, green.500, green.400)' borderRadius={borderRadius} w={boxWidth}>
            <Text  fontSize='xl' fontWeight='bold' color={'white'}>Enter your new password</Text>
                <FormControl my='2'>
                    <FormLabel color={'white'}>Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter your password' backgroundColor={'white'} type={visible} onChange={(e) => setPassword(e.target.value)}/>
                        <InputRightAddon onClick={handleVisible}>
                            {
                                visible == 'password' ?
                                <AiFillEye/>
                                :
                                <AiFillEyeInvisible/>
                            }
                        </InputRightAddon>
                    </InputGroup>
                    <FormLabel mt='2' color={'white'}>Confirmation Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Confirm your password' backgroundColor={'white'} type={visible} onChange={(e) => setConfirmationPassword(e.target.value)}/>
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
                <Button my='6' width='40%' type='button' backgroundColor={"white"} color="Black" onClick={onBtnReset}> 
                    Reset password
                </Button>
            </Box>
        </Box>
     );
}

export default ResetPassword;