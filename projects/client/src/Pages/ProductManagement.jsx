import React, { useRef, useState } from "react";
import {
    Box,
    Td,
    Text,
    Table,
    TableContainer,
    Th,
    Thead,
    Tr,
    Flex,
    Tbody,
    FormControl,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    Input,
    Stack,
    Accordion, 
    AccordionItem, 
    AccordionButton, 
    AccordionPanel, 
    AccordionIcon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Pagination from '../Components/Pagination';
// import React from 'react';

function Report() {
    const [dataAllHistoryStock, setDataAllHistoryStock] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(0);
    const [size] = useState(8);
    const [sortby, setSortby] = useState("name");
    const [order, setOrder] = useState("ASC");
    const [name, setName] = useState("");

    const paginate = pageNumbers => {
        setPage(pageNumbers);
    };


    const getDataHistoryStock = async () => {
        try {
            let token = localStorage.getItem('grocery_login');

            let response = await axios.get(`http://localhost:8000/api/products/allhistorystock?page=${page}&size=${size}&sortby=${sortby}&order=${order}&name=${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDataAllHistoryStock(response.data.data);
            setTotalData(response.data.datanum)
        } catch (error) {
            console.log(error)
        }
    };

    const printHistoryStock = () => {
        return dataAllHistoryStock.map((val, idx) => {
            return (
                <Tr>
                    <Td>
                        {idx + 1}
                    </Td>
                    <Td>
                        {val.name}
                    </Td>
                    <Td>
                        {val.historyStockProducts[0]?.type}
                    </Td>
                    <Td>
                        {val.historyStockProducts[0]?.before}
                    </Td>
                    <Td>
                        {val.historyStockProducts[0]?.after}
                    </Td>
                </Tr>
            )
        })
    }

    // const printHistoryStock = () => {
    //     return dataAllHistoryStock.map((val, idx) => {
    //       return (
    //         <AccordionItem key={idx}>
    //           <h2>
    //             <AccordionButton>
    //               <Box flex="1" textAlign="left">
    //                 {idx + 1}. {val.name}
    //               </Box>
    //               <AccordionIcon />
    //             </AccordionButton>
    //           </h2>
    //           <AccordionPanel pb={4}>
    //             <Table>
    //               <Thead>
    //                 <Tr>
    //                   <Th>Type</Th>
    //                   <Th>Old Stock</Th>
    //                   <Th>New Stock</Th>
    //                 </Tr>
    //               </Thead>
    //               <Tbody>
    //                 <Tr>
    //                   <Td>{val.historyStockProducts[0]?.type}</Td>
    //                   <Td>{val.historyStockProducts[0]?.before}</Td>
    //                   <Td>{val.historyStockProducts[0]?.after}</Td>
    //                 </Tr>
    //               </Tbody>
    //             </Table>
    //           </AccordionPanel>
    //         </AccordionItem>
    //       );
    //     });
    //   };
      

    React.useEffect(() => {
        getDataHistoryStock();
    }, [page, size, sortby, order, name]);



    return (
        <Box
            w={{ base: '100%', sm: '100%', md: '90%', lg: '90%', xl: '85%' }}
            p='2%'
            flexDir='column'
            overflow='auto'
            minH='100vh'
        >
            {/* <Text>Report Page</Text> */}


            <Flex 
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between" 
            align="center" 
            mb="4"
            >
                <FormControl flex="1" mr={{ base: '0', sm: '4' }} mb={{ base: '4', sm: '0' }}>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Search product"
                    />
                </FormControl>
                
                <Menu>
                    <MenuButton
                        as={Button}
                        aria-label="Options"
                        variant="outline"
                        colorScheme="green"
                    >
                        Filter History Stock Product
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                setSortby("name");
                                setOrder("ASC");
                            }}
                        >
                            Sort by product name A-Z
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSortby("name");
                                setOrder("DESC");
                            }}
                        >
                            Sort by product name Z-A
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Product Name</Th>
                  <Th>Type</Th>
                  <Th>Old Stock</Th>
                  <Th>New Stock</Th>
                </Tr>
              </Thead>
              <Tbody>{printHistoryStock()}</Tbody>
            </Table>
          </TableContainer>
      

            <Flex my="10" w="full" justify={{ base: 'center' }}>
                <Pagination
                    size={size}
                    page={page}
                    totalData={totalData}
                    paginate={paginate}
                />
            </Flex>
        </Box>
    );
}

export default Report;