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
    useBreakpointValue
} from '@chakra-ui/react';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { API_URL, checkPassword } from '../helper';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState('password');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const boxWidth = useBreakpointValue({base:'full', sm:'full', md:'40%', lg:'40%'});
    const borderRadius = useBreakpointValue({base:'none', sm:'xl', md:'2xl', lg:'2xl'});

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
        } else {
            setVisible('password');
        }
    }

    const onBtnChange = async () => {
        try {
            if(oldPassword == '' || newPassword == '' || confirmNewPassword == ''){
                return alert('Please fill in all fields');
            }
            if(!checkPassword(oldPassword)){
                return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
            }
            if(!checkPassword(newPassword)){
                return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
            }
            if(!checkPassword(confirmNewPassword)){
                return alert('Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number');
            }
            let token = localStorage.getItem('grocery_login');
            let response = await axios.patch(`${API_URL}/user/change`, {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    return ( 
        <Box pb={{base:'64',lg:'40'}} display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <Box my='10' px='8' py='4' bgGradient='linear(to-b, green.500, green.400)' borderRadius={borderRadius} w={boxWidth}>
            <Text  fontSize='xl' fontWeight='bold' color={'white'}>Enter your new password</Text>
                <FormControl my='2'>
                <FormLabel color={'white'}>Old Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter your old password' backgroundColor={'white'} type={visible} onChange={(e) => setOldPassword(e.target.value)}/>
                        <InputRightAddon onClick={handleVisible}>
                            {
                                visible == 'password' ?
                                <AiFillEye/>
                                :
                                <AiFillEyeInvisible/>
                            }
                        </InputRightAddon>
                    </InputGroup>
                    <FormLabel mt='2' color={'white'}>New Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter your new password' backgroundColor={'white'} type={visible} onChange={(e) => setNewPassword(e.target.value)}/>
                        <InputRightAddon onClick={handleVisible}>
                            {
                                visible == 'password' ?
                                <AiFillEye/>
                                :
                                <AiFillEyeInvisible/>
                            }
                        </InputRightAddon>
                    </InputGroup>
                    <FormLabel mt='2' color={'white'}>Confirmation New Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Confirm your password' backgroundColor={'white'} type={visible} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
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
                <Button my='6' width='40%' type='button' backgroundColor={"white"} color="Black" onClick={onBtnChange}>
                    Reset password
                </Button>
            </Box>
        </Box>
     );
}

export default ChangePassword;