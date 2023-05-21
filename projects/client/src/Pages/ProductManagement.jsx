import React, { useRef, useState } from "react";
import {
    Box,
    Text,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Table,
    TableContainer,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
    Heading,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { HiDocumentAdd, HiViewGridAdd } from "react-icons/hi";
import { FiFilter } from 'react-icons/fi';
import { IoMdAddCircle } from "react-icons/io";
import ProductManagementTwo from "../Components/ProductManagementTwo";
import { API_URL } from "../helper";
import Pagination from '../Components/Pagination';

function ProductManagement(props) {
    const modalProduct = useDisclosure();
    const modalCategory = useDisclosure();
    const [fileProduct, setFileProduct] = useState(null);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const inputFile = useRef(null);
    const modalProductImage = useDisclosure();
    const [dataAllProducts, setDataAllProducts] = useState([]);
    const [dataAllCategory, setDataAllCategory] = useState([]);
    const [dataAllCategory2, setDataAllCategory2] = useState([]);
    const [dataAllBranch, setDataAllBranch] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [category, setCategory] = useState("");
    const [product, setProduct] = useState("");
    const [name, setName] = useState("");
    const [filterName, setFilterName] = useState("");
    const [price, setPrice] = useState("");
    const [categoryNew, setCategoryNew] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const toast = useToast();
    const branch = useSelector((state) => state.authAdminReducer.branchId);
    const [branch_id, setBranch_Id] = useState(branch);
    const [page, setPage] = useState(0);
    const [size] = useState(8);
    const [sortby, setSortby] = useState("name");
    const [order, setOrder] = useState("ASC");

    const paginate = pageNumbers => {
        setPage(pageNumbers);
    };

    const getDataProduct = async () => {
        try {
            let token = localStorage.getItem('grocery_login');

            let response = await axios.get(`http://localhost:8000/api/product/allproducts?page=${page}&size=${size}&sortby=${sortby}&order=${order}&branch_id=${branch_id}&name=${filterName}&category=${filterCategory}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDataAllProducts(response.data.data);
            setTotalData(response.data.datanum)
        } catch (error) {
            console.log(error)
        }
    };

    const getDataCategory = async () => {
        try {
            let token = localStorage.getItem('grocery_login');

            let res = await axios.get(`http://localhost:8000/api/category/allcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDataAllCategory(res.data.data);
            setDataAllCategory2(res.data.data);
            // console.log("get all category", getDataCategory)
        } catch (error) {
            console.log(error)
        }
    };

    const printProductData = () => {
        return dataAllProducts.map((val, idx) => {
            return (
                <ProductManagementTwo
                    idx={idx + 1}
                    name={val.name}
                    // image={val.image}
                    image={val.image && (val.image.includes('http') || val.image.includes('https')) ? val.image : `${API_URL}${val.image}`}
                    price={val.price}
                    description={val.description}
                    category={val.category?.category}
                    category_id={val.category_id}
                    dataAllCategory={dataAllCategory}
                    uuid={val.uuid}
                    newStock={val.newStock}
                    isDeleted={val.isDeleted}
                    getDataProduct={getDataProduct}
                    keeplogin={props.keepLogin}
                    stock={val.stockBranches[0]?.stock}
                    branch_id={val.branch_id}
                />
            );
        });
    };

    const onChangeFile = (event) => {
        modalProductImage.onOpen();
        setFileProduct(event.target.files[0]);
    };

    const printSelectOption = () => {
        return dataAllCategory.map((val, idx) => {
            return (
                <option
                    style={{ backgroundColor: "white", color: "black" }}
                    value={val.id}
                >
                    {val.category}
                </option>
            );
        });
    };

    const printSelectOption2 = () => {
        return dataAllCategory2.map((val, idx) => {
            return (
                <option
                    style={{ backgroundColor: "white", color: "black" }}
                    value={val.category}
                    key={idx}
                >
                    {val.category}
                </option>
            );
        });
    };




    const btnAddProduct = async () => {
        try {
            const parsedPrice = parseFloat(price);

            let token = localStorage.getItem('grocery_login');
            let formData = new FormData();


            formData.append(
                "data",
                JSON.stringify({
                    name: name,
                    price: price,
                    description: description,
                    category_id: parseInt(categoryNew),
                    stock: stock,
                    after: stock,
                    before: 0,
                    branch_id: branch_id

                })
            );
            if (fileProduct != null) {
                formData.append("images", fileProduct);
            }
            let tambah = await axios.post(`http://localhost:8000/api/product/addproducts`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (tambah.data.success) {
                getDataProduct();
                setFileProduct(null);
                toast({
                    position: "top",
                    title: `Add product Success`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                modalProduct.onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getDataProduct();
        getDataCategory();
    }, [page, size, sortby, order, branch_id, filterName, filterCategory]);


    return (
        <Box
            w={{ base: '100%', sm: '100%', md: '90%', lg: '90%', xl: '85%' }}
            p='2%'
            flexDir='column'
            overflow='auto'
            minH='100vh'
        >
            {/* <Text>Product Management Page</Text> */}

            <Flex maxW={"2xl"} minH={"100vh"} bgColor="white">
                <Box justifyItems={"center"} flex={"1"}>
                    <Box display={"flex"}>
                        <>
                            <Heading size={"md"} fontStyle="inherit" mt={"5"} ml={"5"}>Product List</Heading>
                            <Button
                                rounded={"md"}
                                h={"10"}
                                mt={"4"}
                                ml={"4"}
                                bgColor={"green.500"}
                                color="#EEEEEE"
                                _hover={""}
                                p={"2.5"}
                                variant={"link"}
                                onClick={modalProduct.onOpen}
                            >
                                <IoMdAddCircle
                                    size={"20"}
                                    fontWeight={"bold"}
                                    color={"#EEEEEE"}
                                />
                                <Text my={"auto"} pl="2">
                                    Add Product
                                </Text>
                            </Button>

                            <FormControl flexBasis={{ base: "100%", md: "30%" }} mb={{ base: "4", md: "0" }}>
                                <Flex>
                                    <Input
                                        type="text"
                                        value={filterName}
                                        mt={"4"}
                                        ml={"4"}
                                        onChange={(e) => setFilterName(e.target.value)}
                                        placeholder="Search by product name"
                                    />
                                </Flex>
                            </FormControl>

                            <FormControl flexBasis={{ base: "100%", md: "20%" }} mb={{ base: "4", md: "0" }}>
                                <Flex>
                                    <Select
                                        type="text"
                                        value={filterCategory}
                                        mt={"4"}
                                        ml={"4"}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        placeholder="Search by category"
                                    >
                                        {printSelectOption2()}
                                    </Select>
                                </Flex>
                            </FormControl>

                            <FormControl flexBasis={{ base: "100%", md: "20%" }} mb={{ base: "4", md: "0" }}>
                                <Flex>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            aria-label='Options'
                                            mt={"4"}
                                            ml={"4"}
                                            variant='outline'
                                            colorScheme="green"
                                        >
                                            Filter Product
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={() => {
                                                setSortby("name")
                                                setOrder("ASC")
                                            }}>
                                                Sort by product name A-Z
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                setSortby("name")
                                                setOrder("DESC")
                                            }}>
                                                Sort by product name Z-A
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                setSortby("price")
                                                setOrder("ASC")
                                            }}>
                                                Sort by product price low-high
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                setSortby("price")
                                                setOrder("DESC")
                                            }}>
                                                Sort by product price high - low
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </FormControl>

                            {/* BUTTON ADD PRODUCT BRANCH ADMIN */}
                            <Modal
                                initialFocusRef={initialRef}
                                finalFocusRef={finalRef}
                                isOpen={modalProduct.isOpen}
                                onClose={modalProduct.onClose}
                                size="2xl"
                            >
                                <ModalOverlay />
                                <ModalContent bgColor="white" color={"black"}>
                                    <ModalHeader color="black">
                                        Add New Product
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody as={Flex} pb={6}>
                                        <Box flex={"1"} px={"4"}>
                                            <FormControl>
                                                <FormLabel color={"black"}>
                                                    Product Name
                                                </FormLabel>
                                                <Input
                                                    ref={initialRef}
                                                    placeholder="Enter Product Name"
                                                    _hover={""}
                                                    bgColor="white"
                                                    color="black"
                                                    variant={"link"}
                                                    borderColor="black"
                                                    borderWidth="1px"
                                                    borderRadius="md"
                                                    px={2}
                                                    py={1}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                            </FormControl>

                                            <FormControl mt={4}>
                                                <FormLabel color={"black"}>
                                                    Price
                                                </FormLabel>
                                                <Input
                                                    ref={initialRef}
                                                    placeholder="Enter Product Price"
                                                    _hover={""}
                                                    bgColor="white"
                                                    color="black"
                                                    variant={"link"}
                                                    borderColor="black"
                                                    borderWidth="1px"
                                                    borderRadius="md"
                                                    px={2}
                                                    py={1}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                />
                                            </FormControl>

                                            <FormControl mt={4}>
                                                <FormLabel color={"black"}>
                                                    Description
                                                </FormLabel>
                                                <Input
                                                    ref={initialRef}
                                                    placeholder="Enter Product Description"
                                                    _hover={""}
                                                    bgColor="white"
                                                    color="black"
                                                    variant={"link"}
                                                    borderColor="black"
                                                    borderWidth="1px"
                                                    borderRadius="md"
                                                    px={2}
                                                    py={1}
                                                    onChange={(e) =>
                                                        setDescription(e.target.value)
                                                    }
                                                />
                                            </FormControl>

                                            <FormControl mt={4}>
                                                <FormLabel>
                                                    Category
                                                </FormLabel>
                                                <Select
                                                    variant={"link"}
                                                    bgColor="white"
                                                    color="black"
                                                    _hover={""}
                                                    placeholder="Select Option"
                                                    borderColor="black"
                                                    borderWidth="1px"
                                                    borderRadius="md"
                                                    py={1}
                                                    onChange={(e) =>
                                                        setCategoryNew(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {printSelectOption()}
                                                </Select>
                                            </FormControl>

                                            <FormControl mt={4}>
                                                <FormLabel color={"black"}>
                                                    Stock
                                                </FormLabel>
                                                <Input
                                                    ref={initialRef}
                                                    placeholder="Enter Product Stock"
                                                    _hover={""}
                                                    bgColor="white"
                                                    color="black"
                                                    variant={"link"}
                                                    borderColor="black"
                                                    borderWidth="1px"
                                                    borderRadius="md"
                                                    px={2}
                                                    py={1}
                                                    onChange={(e) =>
                                                        setStock(e.target.value)
                                                    }
                                                />
                                            </FormControl>
                                        </Box>

                                        <Box flex={"1"} px={"4"}>
                                            <FormControl>
                                                <FormLabel color={"black"}>
                                                    Product Image
                                                </FormLabel>
                                                <Button
                                                    bgColor="green.500"
                                                    color="white"
                                                    rounded={"md"}
                                                    h={"10"}
                                                    _hover={""}
                                                    p={"2.5"}
                                                    variant={"link"}
                                                    onClick={() =>
                                                        inputFile.current.click()
                                                    }
                                                >
                                                    <HiDocumentAdd
                                                        color="#EEEEEE"
                                                        size={"md"}
                                                    />
                                                    Add a File
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile}
                                                        style={{ display: "none" }}
                                                        onChange={onChangeFile}
                                                    ></input>

                                                </Button>
                                            </FormControl>

                                            <Image
                                                objectFit="cover"
                                                size="4xl"
                                                src={
                                                    fileProduct
                                                        ? URL.createObjectURL(
                                                            fileProduct
                                                        )
                                                        : ""
                                                }
                                            ></Image>
                                        </Box>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button

                                            bgColor="green.500"
                                            color="white"
                                            _hover=""
                                            mr={3}
                                            onClick={btnAddProduct}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            bgColor="green"
                                            color="white"
                                            _hover=""
                                            onClick={modalProduct.onClose}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </>
                    </Box>

                    <Box mt="4">
                        <TableContainer>
                            <Table variant="simple" color={"black"}>
                                <Thead>
                                    <Tr>
                                        <Th>No</Th>
                                        <Th>Product Name</Th>
                                        <Th>Image</Th>
                                        <Th>Price</Th>
                                        <Th>Description</Th>
                                        <Th>Category</Th>
                                        <Th>Stock</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                {printProductData()}
                            </Table>
                        </TableContainer>
                        <Box>
                            <Flex my="10" w="full" justify={{ base: 'center' }}>
                                <Pagination size={size} page={page} totalData={totalData} paginate={paginate} />
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Flex>

        </Box>
    );
}

export default ProductManagement;