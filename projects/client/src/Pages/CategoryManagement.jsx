import React, { useState, useRef } from 'react';
import {
    Box, Button, Container, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Text, Th, Thead,
    Tr, useDisclosure, useToast
} from "@chakra-ui/react";
import axios from 'axios';
import { API_URL } from '../helper';
import { HiViewGridAdd } from 'react-icons/hi';
import Category from '../Components/Category';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Components/Pagination';



function CategoryManagement() {
    const [dataAllCategory, setDataAllCategory] = useState([]);
    const [category, setCategory] = useState('');
    const [page, setPage] = React.useState(0);
    const [size, setSize] = useState(8);
    const [sortby, setSortby] = React.useState("category");
    const [order, setOrder] = React.useState("ASC");
    const [totalData, setTotalData] = React.useState(0);
    const modalCategory = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toast = useToast();
    const navigate = useNavigate()


    const getDataCategory = async () => {
        try {
            let token = localStorage.getItem('grocery_login');
            
            let response = await axios.get(`http://localhost:8000/api/category/allcategory?page=${page}&size=${size}&sortby=${sortby}&order=${order}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("ini hasil get all category", response.data.data)
            setDataAllCategory(response.data.data)
            setTotalData(response.data.datanum);
        } catch (error) {
            console.log(error)
        }
    }

    const btnAddCategory = async () => {
        try {
            await axios.post(`http://localhost:8000/api/category/addcategory`, {
                category: category
            });
            modalCategory.onClose();
            getDataCategory();
            toast({
                position: 'bottom',
                title: `Add Category Success`,
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
        } catch (error) {
            console.log(error)
            toast({
                position: 'top',
                title: `${error.response.data.message}`,
                description: "Please Choose Another Category Name",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const printCategoryData = () => {
        return dataAllCategory.map((val, idx) => {
            return <Category key={val.id} id={val.id} idx={idx + 1} categoryId={val.id} category={val.category}
                dataAllCategory={dataAllCategory} getDataCategory={getDataCategory}
            />
        })
    }


    React.useEffect(() => {
        getDataCategory();
    }, [page, size, sortby, order])

    // Pagination
    const paginate = pageNumbers => {
        setPage(pageNumbers);
    }


    return (
        <Box
            w={{ base: '100%', sm: '100%', md: '90%', lg: '90%', xl: '85%' }}
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
            <Flex p={"2%"} as={Container} maxW={"8xl"} minH={"100vh"} bgColor="#white">
                <Box justifyItems={"center"} flex={"1"}>
                    <Box display={"flex"}>
                        <>
                            <Button
                                rounded={"md"}
                                h={"10"}
                                mt={"4"}
                                ml={"4"}
                                bgColor="green.500"
                                color="#EEEEEE"
                                _hover={""}
                                p={"2.5"}
                                variant={"link"}
                                onClick={modalCategory.onOpen}
                            >
                                <HiViewGridAdd
                                    size={"20"}
                                    fontWeight={"bold"}
                                    color={"#EEEEEE"}
                                />
                                <Text my={"auto"} pl='2'>Add Category</Text>
                            </Button>

                            <Button
                                rounded={"md"}
                                h={"10"}
                                mt={"4"}
                                ml={"4"}
                                bgColor="green.500"
                                color="#EEEEEE"
                                _hover={""}
                                p={"2.5"}
                                variant={"link"}
                                onClick={() => navigate("/undeletecategories")}
                                display={"none"}
                            >
                                {/* <HiViewGridAdd
                                size={"20"}
                                fontWeight={"bold"}
                                color={"#EEEEEE"}
                            /> */}
                                <Text my={"auto"} pl='2'>Category Deleted</Text>
                            </Button>

                            <Modal
                                initialFocusRef={initialRef}
                                finalFocusRef={finalRef}
                                isOpen={modalCategory.isOpen}
                                onClose={modalCategory.onClose}
                            >
                                <ModalOverlay />
                                <ModalContent bgColor="green.500" color={"#EEEEEE"}>
                                    <ModalHeader color="white">
                                        Add New Category
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel color={"#EEEEEE"}>
                                                Category Name
                                            </FormLabel>
                                            <Input
                                                ref={initialRef}
                                                placeholder="Enter new category name"
                                                _hover={""}
                                                bgColor="#white"
                                                color="green.500"
                                                variant={"link"}
                                                onChange={(e) => setCategory(e.target.value)}
                                            />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            bgColor="green"
                                            color="#EEEEEE"
                                            _hover=""
                                            mr={3}
                                            onClick={btnAddCategory}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            bgColor="#EEEEEE"
                                            color="green.500"
                                            _hover=""
                                            onClick={modalCategory.onClose}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </>

                    </Box>

                    <Box mt='4'>
                        <TableContainer>
                            <Table variant='simple' color={'black'}>
                                <Thead>
                                    <Tr>
                                        <Th w='10%'>No</Th>
                                        {/* <Th w='10%'>ID</Th> */}
                                        <Th w='60%'>Category</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                {printCategoryData()}
                            </Table>
                        </TableContainer>
                    </Box>
                    <Flex my='10' w='full' justify={'center'}>
                        <Pagination size={size} page={page} totalData={totalData} paginate={paginate} />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default CategoryManagement;