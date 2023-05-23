import {
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Text,
    Flex,
    Spinner,
    Box,
    Heading,
    Icon,
    Image,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select,
    TabIndicator,
    Stack,
    StackDivider,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function OrderList() {

    const location = useLocation();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getOrderList();
      }, [status, page]);

    const getOrderList = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/transaction/list', {
            params: { status, page },
          });

        //   console.log('ini dari response: ', response.data.data)

          const { data, totalPages } = response.data;
          setOrders(data);
          setTotalPages(totalPages);
        } catch (error) {
          console.error(error);
        }
      };

      const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setPage(1);
      };
    
      const handlePageChange = (newPage) => {
        setPage(newPage);
      };
    return (
        <>
            <Box>
                <Box
                    my={{ base: "8", md: "12" }}
                    color={"white"}
                    maxW={"6xl"}
                    mx={"auto"}
                    rounded={"lg"}
                    boxShadow={"md"}
                    px={{ base: "4", lg: "8" }}
                >
                    <Heading mb="6" color={'black'}>Your Orders</Heading>

                    <Tabs
                        align="center"
                        isLazy
                        variant={"unstyled"}
                    >
                        <TabList mr="3" overflowX={'auto'} color={'#6FA66F'}>
                            <Tab>All</Tab>
                            <Tab>Awaiting Payment</Tab>
                            <Tab>Waiting for Confirmation</Tab>
                            <Tab>On Going</Tab>
                            <Tab>On Delivery</Tab>
                            <Tab>Completed</Tab>
                            <Tab>Cancelled</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-1.5px"
                            height="2px"
                            bg="#6FA66F"
                            borderRadius="1px"
                        />
                        <Divider />
                        <TabPanels>
                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                                    
                                </Flex>
                            </TabPanel>

                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                                   
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                                    
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                             
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                                 
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                                  
                                </Flex>
                            </TabPanel>

                            <TabPanel>
                                <Box position={"relative"} mb="20" mt="3">
                                    <Select
                                        w={{ base: "36%", md: "16%", lg: "13%" }}
                                        float={"right"}
                                        color={"#6FA66F"}
                                    >
                                        <option value="DESC">Newest</option>
                                        <option value="ASC">Oldest</option>
                                    </Select>
                                </Box>
                                <Flex
                                    justifyContent={"center"}
                                    w={"full"}
                                >
                            
                                </Flex>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </>
    );
}

export default OrderList;