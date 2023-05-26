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
import { API_URL, checkName, checkEmail, checkPhone, checkPassword } from '../helper';
import { useNavigate } from 'react-router-dom';
import userregister from '../Asset/userregister.png';

function UserRegister() {
    const [visible, setVisible] = React.useState('password');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');
    const navigate = useNavigate();
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

    const onBtnRegister = async () => {
        try {
            if (name == '' || email == '' || phone == '' || password == '' || confirmationPassword == '') {
                // return alert('Please fill in all fields')
                return toast({
                    position: 'top',
                    title: "Register New User",
                    description: 'Please complete all required fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if (!checkName(name)){
                // return alert('Please enter a valid name with a minimum length of 100 characters');
                return toast({
                    position: 'top',
                    title: "Register New User",
                    description: 'Please enter a valid name with a minimum length of 100 characters',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if(!checkEmail(email)){
                // return alert('Please enter a valid email address');
                return toast({
                    position: 'top',
                    title: "Register New User",
                    description: 'Please enter a valid email address',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if(!checkPhone(phone)){
                // return alert('Please enter a valid phone number')
                return toast({
                    position: 'top',
                    title: "Register New User",
                    description: 'Please enter a valid phone number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                });
            }
            if(!checkPassword(password)){
                // return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
                return toast({
                    position: 'top',
                    title: "Register New User",
                    description: 'Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            // console.log(API_URL);
            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
                name: name,
                email: email,
                phone: phone,
                password: password,
                confirmationPassword: confirmationPassword
            });
            console.log('Response :', response.body);
            console.log('Response dari be :', response.data.message);
            
            if (response.data.success) {
                // alert(response.data.message);
                toast({
                    position: 'top',
                    title: "Register New User",
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                });
                navigate('/');
            }
        } catch (error) {
            console.log("Error :", error);
            console.log("Error message :", error.response.data);
            // alert(error.response.data.message);
            // alert(error.response.data.error[3].msg);
            // alert(error.response.data.error[5].msg);
            // alert(error.response.data.error[7].msg);
            const toastMessages = [
                { index: 0, title: "Status", duration: 2000 },
                { index: 3, title: "Status", duration: 2000 },
                { index: 5, title: "Status", duration: 2000 },
                { index: 7, title: "Status", duration: 2000 }
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
                  break;
                }
              }
        }
    }

    return ( 
        <Flex minH={'100vh'} justify={'center'} mt='5' mb='4'>
            <Flex mx="auto" mt='0px' maxH='2xl' maxWidth={'6xl'}>
                <Box w="60%" display={{base:'none', sm:'none', md:'flex', lg:'flex'}}>
                    <Image borderLeftRadius='2xl' w='full' h="full" src={userregister} alt='Sign up picture' />
                </Box>
                <Box px='8' py='4' bgGradient='linear(to-b, green.500, green.400)' borderRadius={borderRadiusB} borderRightRadius={borderRadiusA} w={boxWidth}>
                    <Text  fontSize='4xl' fontWeight='bold' color={'white'}>Welcome to Grocey Shop</Text>
                    <FormControl mt='4'>
                        <FormLabel color={'white'}>Name</FormLabel>
                        <Input placeholder='Enter your name' backgroundColor={'white'} type='text' onChange={(e) => setName(e.target.value)}/>
                    </FormControl>
                    <FormControl my='2'>
                        <FormLabel color={'white'}>Email</FormLabel>
                        <Input placeholder='Enter your email' backgroundColor={'white'} type='email' onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl my='2'>
                        <FormLabel color={'white'}>Phone Number</FormLabel>
                        <Input placeholder='Enter your phone number' backgroundColor={'white'} type='number' onChange={(e) => setPhone(e.target.value)}/>
                    </FormControl>
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
                    <Button my='6' width='full' type='button' backgroundColor={"white"} color="Black" onClick={onBtnRegister}> 
                        Sign Up
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
}

export default UserRegister;