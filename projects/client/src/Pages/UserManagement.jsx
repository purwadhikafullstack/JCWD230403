import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    ButtonGroup,
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
    Select,
    Flex,
    Switch,
    useToast,
    Icon,
    Text,
    useBreakpointValue,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel
  } from '@chakra-ui/react';
import axios from 'axios';
import { API_URL, checkName, checkEmail, checkPhone, checkPassword } from '../helper';
import { BsPersonFillAdd } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineUnlock } from 'react-icons/ai';
import {IoIosArrowDropup, IoIosArrowDropdown} from 'react-icons/io';
import Pagination from '../Components/Pagination';

function UserManagement() {
    let token = localStorage.getItem('grocery_login');
    const toast = useToast();

    ///// ADMIN LIST /////
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [sortby, setSortby] = useState('name');
    const [order, setOrder] = useState('ASC');
    const [filterName, setFilterName] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [adminList, setAdminList] = useState([]);
    const getAdminList = async () => {
        try {
            let response = await axios.get(`${API_URL}/admin/adminlist?page=${page}&size=${size}&sortby=${sortby}&order=${order}&name=${filterName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAdminList(response.data.data)
            console.log("Data dari setAdmin", response.data.data);
            setTotalData(response.data.datanum);
            console.log('Ini Jumlah Admin :', response.data.datanum);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAdminList()
    }, [page, size, sortby, order, filterName])

    const isMobile = useBreakpointValue({base: true, sm: true, md: false})

    const printAdmin = () => {
        return adminList.map((val,idx) => {
            if(isMobile){
                return(
                <Accordion allowMultiple key={val.uuid}>
                  <AccordionItem px={'1'} style={{ overflowY: 'auto', maxHeight: '150px' }}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="lg">
                          <span style={{ marginRight: '10px', display: 'inline-block', textAlign: 'center', minWidth: '20px' }}>{idx + 1}.</span>
                          {val.name}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Box w="100%" mb="4">
                        <Text fontWeight="bold">Email:</Text>
                        <Text>{val.email}</Text>
                      </Box>
                      <Box w="100%" mb="4">
                        <Text fontWeight="bold">Phone:</Text>
                        <Text>{val.phone}</Text>
                      </Box>
                      <Box w="100%" mb="4">
                        <Text fontWeight="bold">Role:</Text>
                        <Text>{val.role?.role}</Text>
                      </Box>
                      <Box w="100%" mb="4">
                        <Text fontWeight="bold">Branch:</Text>
                        <Text>{val.branch?.branchname}</Text>
                      </Box>
                      <Flex alignItems="center" justifyContent="space-evenly" gap="2" w="100%">
                        <Switch
                          colorScheme="red"
                          isChecked={val.isDeleted}
                          onChange={() => {
                            onBtnDelete(val.uuid, !val.isDeleted);
                          }}
                        />
                        <Box
                          bg={val.isDeleted ? 'red.500' : 'green.500'}
                          color="white"
                          p="1"
                          borderRadius="md"
                          textAlign="center"
                        >
                          {val.isDeleted ? 'inactive' : 'active'}
                        </Box>
                      </Flex>
                      <ButtonGroup alignItems="Center" spacing="0.5" mt="4">
                        <Button
                          onClick={() => {
                            onOpenEditBtn(val.uuid, val.name, val.email, val.phone, val.roleId, val.branchId);
                          }}
                          leftIcon={<FaRegEdit />}
                          colorScheme="blue"
                          variant="ghost"
                          p="2"
                          size="xs"
                          letterSpacing="tight"
                        >
                          Edit
                        </Button>
                        <Button
                          leftIcon={<AiOutlineUnlock />}
                          color="gray"
                          variant="ghost"
                          size="xs"
                          p="2"
                          letterSpacing="tight"
                          onClick={() => {
                            onOpenResetBtn(val.uuid, val.password);
                          }}
                        >
                          Reset Password
                        </Button>
                      </ButtonGroup>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                )
            } else {
                return (
                <Tr key={val.uuid}>
                    <Td>
                        <Box w={'50%'}>
                            {idx + 1}
                        </Box>
                    </Td>
                    <Td>
                        <Box w={'50%'}>
                            {val.name}
                        </Box>
                    </Td>
                    <Td>{val.email}</Td>
                    <Td>{val.phone}</Td>
                    <Td>{val.role?.role}</Td>
                    <Td>{val.branch?.branchname}</Td> 
                    <Td>
                        <Flex 
                            alignItems={'center'} 
                            justifyContent={'space-between'}
                            gap={'2'}
                            w={'100%'}
                        >
                        <Switch 
                            colorScheme='red'
                            isChecked={val.isDeleted}
                            onChange={() => {
                                onBtnDelete(val.uuid, !val.isDeleted);
                            }}
                        />
                        <Box
                          bg={val.isDeleted ? 'red.500' : 'green.500'}
                          color='white'
                          p={'1'}
                          borderRadius='md'
                          textAlign={'center'}
                        >
                          {val.isDeleted ? 'inactive' : 'active'}
                        </Box>
                        </Flex>
                    </Td>
                    <Td>
                        <ButtonGroup 
                            alignItems={'Center'}
                            spacing={'0.5'}
                        >
                            <Button 
                                onClick={() => {
                                    onOpenEditBtn(
                                        val.uuid,
                                        val.name,
                                        val.email,
                                        val.phone,
                                        val.roleId,
                                        val.branchId
                                    );
                                }}
                                leftIcon={<FaRegEdit/>} 
                                colorScheme='blue' 
                                variant='ghost'
                                p={'2'} 
                                size='xs'
                                letterSpacing={'tight'}
                            >
                                Edit
                            </Button>
                            <Button
                                leftIcon={<AiOutlineUnlock/>}
                                color={'gary'}
                                variant='ghost'
                                size={'xs'}
                                p={'2'}
                                letterSpacing={'tight'}
                                onClick={() => {
                                    onOpenResetBtn(
                                        val.uuid,
                                        val.password
                                    )
                                }}
                            >
                                Reset Password
                            </Button>
                        </ButtonGroup>
                    </Td>
                </Tr>
                )
            }
        })
    }

    const paginate = pageNumber => {
        setPage(pageNumber)
    }

    ////////// ADMIN SORTING BY NAME, ROLE, BRANCH //////////
    const handleSort = (sortbyData) => {
        if (sortby === sortbyData) {
            setOrder(order === 'ASC' ? 'DESC' : 'ASC');
        } else if (sortby === 'role') {
            setSortby(sortbyData);
            setOrder(order === 'ASC' ? 'DESC' : 'ASC');
        } else if (sortby === 'branchname') {
            setSortby(sortbyData);
            setOrder(order === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortby(sortbyData);
            setOrder('ASC')
        }
    }

    ///// REGISTER NEW ADMIN /////
    const { 
        isOpen: isOpenRegister, 
        onOpen: onOpenRegister, 
        onClose: onCloseRegister 
        } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [branchId, setBranchId] = useState('');

    const onBtnRegister = async () => {
        try {
            if (!token) {
                return toast({
                    position: 'top',
                    title: "Create new admin",
                    description: 'unauthorized access',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (name == ''|| email == '' || phone == '' || password == '' || confirmationPassword == '' || roleId == '' || branchId == ''){
                return toast({
                    position: 'top',
                    title: "Create new admin",
                    description: 'Please complete all required fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkName(name)) {
                return toast({
                    position: 'top',
                    title: "Create new admin",
                    description: 'Please enter a valid name with a minimum length of 100 characters',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkEmail(email)) {
                return toast({
                    position: 'top',
                    title: "Create new admin",
                    description: 'Please enter a valid email address',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkPhone(phone)) {
                return toast({
                    position: 'top',
                    title: "Create new admin",
                    description: 'Please enter a valid phone number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkPassword(password)) {
                return toast({
                    position: 'top',
                    title: "Create new admin",
                    description: 'Please enter a password that is at least 6 characters long and contains at least one uppercase letter, one lowercase letter, and one number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            // console.log("roleId before set: ", roleId);
            // console.log("branchId before set: ", branchId);
            let response = await axios.post(`${API_URL}/admin/adminregister`, {
                name: name,
                email: email,
                phone: phone,
                password: password,
                confirmationPassword: confirmationPassword,
                roleId: roleId,
                branchId: branchId,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Data dari response register :", response);
            console.log("roleId after set: ", roleId);
            console.log("branchId after set: ", branchId);

            if(response.data.success) {
                // alert('Register Success ✅');
                toast({
                    position: 'top',
                    title: "Create new admin",
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                onCloseRegister();
                getAdminList();
            } else {
                // alert('Registration failed ❌');
                return toast({
                    position: 'bottom',
                    title: "Create new admin",
                    description: response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
            }

        } catch (error) {
            console.log(error);
            // alert(error.response.data.message);
            return toast({
                position: 'top',
                title: "Status",
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    ///// EDIT ADMIN /////
    const { 
        isOpen: isOpenedit, 
        onOpen: onOpenEdit, 
        onClose: onCloseEdit 
        } = useDisclosure();
    const [uuid, setUuid] = useState('');
    
    const onOpenEditBtn = (
        uuid,
        name,
        email,
        phone,
        roleId,
        branchId
    ) => {
        onOpenEdit();
        setUuid(uuid);
        setName(name);
        setEmail(email);
        setPhone(phone);
        setRoleId(roleId);
        setBranchId(branchId);
    }

    const onBtnEdit = async () => {
        try {
            if (name == '' || email == '' || phone == '' || roleId == '' || branchId == '') {
                return toast({
                    position: 'top',
                    title: 'Edit account',
                    description: 'Please complete all required fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkName(name)) {
                return toast({
                    position: 'top',
                    title: 'Edit account',
                    description: 'Please enter a valid name with a minimum length of 100 characters',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkEmail(email)) {
                return toast({
                    position: 'top',
                    title: 'Edit account',
                    description: 'Please enter a valid email address',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (!checkPhone(phone)) {
                return toast({
                    position: 'top',
                    title: 'Edit account',
                    description: 'Please enter a valid phone number',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            let response = await axios.patch(`${API_URL}/admin/adminedit/${uuid}`, {
                name: name,
                email: email,
                phone: phone,
                roleId: roleId,
                branchId: branchId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("ini Data dari response edit :", response);

            if (response.data.success) {
                // alert('Admin Change Success ✅');
                toast({
                    position: 'top',
                    title: 'Edit account',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                onCloseEdit();
                getAdminList();
            } else {
                // alert('Admin change failed ❌');
                toast({
                    position: 'top',
                    title: 'Edit account',
                    description: response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log(error);
            // alert('An error occurred. Please try again later.');
            toast({
                position: 'top',
                title: 'Edit account',
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    ///// RESET PASSWORD ADMIN /////
    const {
        isOpen: isOpenReset,
        onOpen: onOpenReset,
        onClose: onCloseReset
    } = useDisclosure();
    const onOpenResetBtn = (
        uuid,
        password
    ) => {
        onOpenReset();
        setUuid(uuid);
        setPassword(password);
    }
    const onBtnReset = async () => {
        try {
            let response = await axios.patch(`${API_URL}/admin/adminreset/${uuid}`, {
                password: password,
                confirmationPassword: confirmationPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                toast({
                    position: 'top',
                    title: "Reset Password",
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                });
                onCloseReset();
                getAdminList();
            } else {
                toast({
                    position: 'top',
                    title: "Reset Password",
                    description: "Password reset failed. Please try again.",
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                position: 'top',
                title: "Reset Password",
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        }
    }

    ///// DELETE ADMIN /////
    const onBtnDelete = async (uuid, isDeleted) => {
        try {
            let response = await axios.patch(`${API_URL}/admin/admindelete/${uuid}`, {
                isDeleted: isDeleted
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                toast({
                    position: 'top',
                    title: "Status",
                    description: response.data.message,
                    status: 'info',
                    duration: 2000,
                    isClosable: true
                })
            }
            getAdminList();
            
        } catch (error) {
            console.log(error);
            toast({
                position: 'top',
                title: "Status",
                description: error.response.data.message,
                status: 'info',
                duration: 2000,
                isClosable: true
            })
        }
    }

    return ( 
        <Box
            w={{base:'100%', sm:'100%', md:'90%', lg:'90%', xl:'85%'}}
            p='1%'
            px='2%'
            flexDir={'column'}
            minH='100vh'
            color='black'
            overflow="auto"
            css={{
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
        >
            {/* Modal Register new Admin */}
            <Box 
                py={2} 
                display={'flex'} 
                px={{base:'4', sm:'3', md:'4'}}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Button 
                    onClick={onOpenRegister} 
                    backgroundColor="white" 
                    className='shadow-sm' 
                    size="sm" 
                    rounded="full" 
                    padding={2} 
                    gap={1} 
                    justifyItems="center"
                    fontSize={'md'}
                    >
                        <Box color='green.500' fontSize={'2xl'}>
                        <BsPersonFillAdd/>
                        </Box>
                        Add new admin
                </Button>
                <Box>
                    <Input
                        h={'1.5rem'}
                        placeholder='Filter by name' 
                        size="sm" 
                        w={'80%'}
                        type={'search'} 
                        rounded={'lg'} 
                        backgroundColor={'white'}
                        value={filterName}
                        onChange={(event) => setFilterName(event.target.value)}
                    />
                </Box>
            </Box>
            <Modal 
                initialFocusRef={initialRef} 
                finalFocusRef={finalRef} 
                isOpen={isOpenRegister} 
                onClose={onCloseRegister}
                size={{base:'full', sm:'full', md:'2xl',lg:'2xl'}}
                >
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Create new admin</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter name'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Enter Phone number'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Select onChange={(e) => setRoleId(e.target.value)} placeholder='Select Admin Role'>
                                  <option value='1'>Admin</option>
                                  <option value='2'>Branch Admin</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Branch</FormLabel>
                                <Select onChange={(e) => setBranchId(e.target.value)} placeholder='Select Admin Branch'>
                                  <option value='1'>Jakarta</option>
                                  <option value='2'>Bandung</option>
                                  <option value='3'>Bogor</option>
                                  <option value='4'>Bali</option>
                                  <option value='5'>Surabaya</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                  <Input onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' pr='4.5rem' type={show ? 'text' : 'password'}/>
                                  <InputRightElement width='4.5rem'>
                                  <Button color={'black'} h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                  </Button>
                                  </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirmation password</FormLabel>
                                <InputGroup>
                                  <Input onChange={(e) => setConfirmationPassword(e.target.value)} placeholder='Enter Password' pr='4.5rem' type={show ? 'text' : 'password'}/>
                                  <InputRightElement width='4.5rem'>
                                  <Button color={'black'} h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                  </Button>
                                  </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='green' 
                                mr={3}
                                onClick={onBtnRegister}
                            >
                                Create
                            </Button>
                            <Button 
                                colorScheme='red' 
                                onClick={onCloseRegister}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>

            </Modal>
            {/* Modal Edit Admin */}
            <Modal 
                initialFocusRef={initialRef} 
                finalFocusRef={finalRef} 
                isOpen={isOpenedit} 
                onClose={onCloseEdit}
                size={{base:'full', sm:'full', md:'2xl',lg:'2xl'}}
                >
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Edit admin</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter name'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Enter Phone number'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Select value={roleId} onChange={(e) => setRoleId(e.target.value)} placeholder='Select Admin Role'>
                                  <option value='1'>Admin</option>
                                  <option value='2'>Branch Admin</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Branch</FormLabel>
                                <Select value={branchId} onChange={(e) => setBranchId(e.target.value)} placeholder='Select Admin Branch'>
                                  <option value='1'>Jakarta</option>
                                  <option value='2'>Bandung</option>
                                  <option value='3'>Bogor</option>
                                  <option value='4'>Bali</option>
                                  <option value='5'>Surabaya</option>
                                </Select>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='green' 
                                mr={3}
                                // onClick={onBtnEdit}
                                onClick={onBtnEdit}
                            >
                                Save
                            </Button>
                            <Button 
                                colorScheme='red' 
                                onClick={onCloseEdit}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
            {/* Modal reset password admin */}
            <Modal
                initialFocusRef={initialRef} 
                finalFocusRef={finalRef} 
                isOpen={isOpenReset} 
                onClose={onCloseReset}
                size={{base:'full', sm:'full', md:'2xl',lg:'2xl'}}
            > 
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Reset password</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <Input onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' pr='4.5rem' type={show ? 'text' : 'password'}/>
                              <InputRightElement width='4.5rem'>
                              <Button color={'black'} h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                              </Button>
                              </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirmation password</FormLabel>
                            <InputGroup>
                              <Input onChange={(e) => setConfirmationPassword(e.target.value)} placeholder='Enter Password' pr='4.5rem' type={show ? 'text' : 'password'}/>
                              <InputRightElement width='4.5rem'>
                              <Button color={'black'} h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                              </Button>
                              </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                            <Button
                                colorScheme='green' 
                                mr={3}
                                onClick={onBtnReset}
                            >
                                Save
                            </Button>
                            <Button 
                                colorScheme='red' 
                                onClick={onCloseReset}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Table */}
            <Box
                py={'2'}
                w={'auto'}
            >
                <Flex
                    flexDir={'column'}
                    marginBottom={'auto'}
                    h={'83vh'}
                    justifyContent={'space-between'}
                >
                    <TableContainer>
                    <Table size='sm' variant="simple">
                            <Thead px={'4'} >
                                <Tr display={{base: 'table-row', sm: 'table-row', md: 'none'}}>
                                    <Th 
                                        pl={'12'} 
                                        fontSize={'md'} 
                                        pb={'4'}
                                        onClick={() => handleSort('name')}
                                    >
                                        <Flex alignItems={'center'}>
                                            Name
                                            <Icon 
                                              as={
                                                sortby === 'name' && order === 'ASC' ?
                                                    IoIosArrowDropdown : IoIosArrowDropup
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                </Tr>
                                <Tr display={{base:'none', sm:'none', md: 'table-row'}}>
                                    <Th textAlign={'start'}>No</Th>
                                    <Th 
                                        textAlign={'start'}
                                        onClick={() => handleSort('name')}
                                    >
                                        <Flex
                                            // justifyContent={'center'} 
                                            alignItems={'center'}
                                        >
                                            Name
                                            <Icon 
                                              as={
                                                sortby === 'name' && order === 'ASC' ?
                                                    IoIosArrowDropdown : IoIosArrowDropup
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                    <Th>Email</Th>
                                    <Th textAlign={'start'}>Phone Number</Th>
                                    <Th 
                                        textAlign={'start'}
                                        onClick={() => handleSort('role')}
                                    >
                                        <Flex
                                            alignItems={'center'}
                                        >
                                            Role
                                            <Icon 
                                              as={
                                                sortby === 'role' && order === 'ASC' ?
                                                    IoIosArrowDropup : IoIosArrowDropdown
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                    <Th 
                                        textAlign={'start'}
                                        onClick={() => handleSort('branchname')}
                                    >
                                        <Flex
                                            alignItems={'center'}
                                        >
                                            Branch
                                            <Icon 
                                              as={
                                                sortby === 'branchname' && order === 'ASC' ?
                                                    IoIosArrowDropup : IoIosArrowDropdown
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                    <Th 
                                        textAlign={'end'}
                                    >
                                        <Flex
                                            alignItems={'center'}
                                            justifyContent={'end'}
                                        >
                                            Status
                                        </Flex>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {printAdmin()}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex justifyContent={'center'} >
                        <Pagination
                            page = {page}
                            size = {size}
                            totalData = {totalData}
                            paginate = {paginate}
                        />
                    </Flex>
                </Flex>
            </Box>
        </Box>
     );
}

export default UserManagement;