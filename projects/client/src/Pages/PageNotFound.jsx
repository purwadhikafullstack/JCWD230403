import React from 'react';
import { 
    Button,
    Box,
    Text,
    Stack
 } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PageNotFound() {
    const navigate = useNavigate();
    const roleIdAdmin = useSelector((state) => state.authAdminReducer.roleId);
    const roleIdUser = useSelector((state) => state.authUserReducer.roleId);
    const roleId = roleIdAdmin || roleIdUser

    return ( 
        <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} pb={'28'} >
            <Stack>
                <Text fontSize={'6xl'}>404</Text>
                <Text pb='4' fontSize={'lg'}>Page Not Found</Text>
                <Button color={'white'} bgGradient='linear(to-b, green.500, green.400)' _hover={{ bgGradient:'linear(to-b, green.700, green.600)' }} onClick={() => navigate(roleId == 1 || roleId == 2 ? '/admin' : '/')}>Go Back to Homepage</Button>
            </Stack>
        </Box>
     );
}

export default PageNotFound;