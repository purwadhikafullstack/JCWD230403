import React, { useState } from 'react';
import Promo from '../Components/Promo';
import ProductCategories from '../Components/ProductCategories';
import ProductSuggestions from '../Components/ProductSuggestions';
import Footer from '../Components/Footer';
import { Flex, Box, Menu, MenuButton, MenuItem, MenuList, IconButton, Text, SimpleGrid, GridItem, Heading, Select, Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import Product from '../Components/product';
import { FiFilter } from 'react-icons/fi';
import Pagination from '../Components/Pagination';
import Location from '../Components/Location';
import Header from '../Components/Header';


function Landing() {

    const [showStock, setShowStock] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = useState(6);
    const [name, setName] = React.useState("");
    const [totalData, setTotalData] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [lattitude, setLattitude] = React.useState(0);
    const [branch_id, setBranch_Id] = React.useState();
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState("");
    const [sortby, setSortby] = React.useState("name");
    const [order, setOrder] = React.useState("ASC");
    const [category, setCategory] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [product_id, setProduct_id] = React.useState("");
    const [nearestBranch, setNearestBranch] = React.useState({
        id: 1
    });

    const getAllStock = async () => {
        try {
            let response = await axios.post(`http://localhost:8000/api/product/allstock?category=${category}&stock=${stock}&branch_id=${nearestBranch?.id}&product_id=${product_id}&sortby=${sortby}&order=${order}&page=${page}&size=${size}`,
                {},);
            console.log("name", name);
            console.log("branch_id", branch_id);
            console.log("ini response.data dari getAllStock :", response.data.data);
            setShowStock(response.data.data);
            setTotalData(response.data.datanum);
        } catch (error) {
            console.log("dari getAllStock :", error);
        }
    };

    // Menjalankan fungsi getAllStock
    React.useEffect(() => {
        getAllStock();
    }, [category, stock, branch_id, product_id, sortby, order, page, size]);

    // Print list of products
    const printAllStock = () => {
        console.log("ini isi showStock :", showStock);
        let print = showStock.map((val, idx) => {
            console.log("ini val :", val);
            return <Product name={val.name} productimage={val.image} price={val.price} productId={val.id} stock={stock} />
        });
        return print;
    }
 
    // Pagination
    const paginate = pageNumbers => {
        setPage(pageNumbers);
    };

    console.log(`The nearest branch is km away.`, nearestBranch);


    return (<div>
        <Header/>
        <Promo />
        <Box py={'8'} mt='8' px={'2'} backgroundColor={'whitesmoke'}>
            <Heading fontSize={'xl'}>Categories</Heading>
            <Flex maxW='6xs' flexWrap='wrap' justifyContent='center' gap={'2'} alignItem='start'>
                <ProductCategories
                    path="/product"
                />
                <ProductCategories
                    path="/product"
                />
                <ProductCategories
                    path="/product"
                />
                <ProductCategories
                    path="/product"
                />
                <ProductCategories
                    path="/product"
                />
                <ProductCategories
                    path="/product"
                />
            </Flex>
        </Box>
        {/* <Box py={'8'} px={'2'} backgroundColor={'whitesmoke'}>
            <Heading fontSize={'xl'}>Popular Product</Heading>
            <Flex maxW='6xs' flexWrap='wrap' justifyContent='center' gap={'2'} alignItem='start'>
                <ProductSuggestions />
                <ProductSuggestions />
                <ProductSuggestions />
                <ProductSuggestions />
                <ProductSuggestions />
                <ProductSuggestions />
            </Flex>
        </Box> */}
        <>
            {/* INI PRODUCT */}
            <Flex justify={'center'}>
                <Box paddingTop='4' pb='8'>
                    <Flex p={{ base: '4', lg: '2' }} >
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<FiFilter />}
                                variant='outline'
                                color='orange.400'
                                _expanded={{ bg: 'white', color: 'orange' }}
                            />
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
                    <Flex>
                        <GridItem>
                            <Text onChange={(e) => setBranch_Id(e.target.value)} mt={"10px"}></Text>
                            <Location nearestBranch={nearestBranch} setNearestBranch={setNearestBranch} />
                        </GridItem>
                    </Flex>
                    <Flex minHeight="100vh" maxW='8xs' flexWrap='wrap' justifyContent='space-evenly' alignItem='start'>
                        <SimpleGrid columns={[1, 2, 3]} spacing={8}  >
                            {printAllStock()}
                        </SimpleGrid>
                        <Flex my='10' w='full' justify={'center'}>
                            <Pagination size={size} page={page} totalData={totalData} paginate={paginate} />
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
        <Footer />
    </div>);

}

export default Landing;