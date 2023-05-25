import React, { useState, useRef } from 'react';
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
import { useSelector } from 'react-redux';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';


function Landing() {
    let token = localStorage.getItem('grocery_login');
    const userName = useSelector((state) => state.authUserReducer.name);
    const roleId = useSelector((state) => state.authUserReducer.roleId);
    const branch = useSelector((state) => state.authUserReducer.branchId);

    const [showStock, setShowStock] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = useState(6);
    const [name, setName] = React.useState("");
    const [totalData, setTotalData] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [lattitude, setLattitude] = React.useState(0);
    // const [branch_id, setBranch_Id] = React.useState(branch);
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
    const [specialPrice, setSpecialPrice] = React.useState('');

    const getAllStock = async () => {
        try {

            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product/allstock?category=${category}&stock=${stock}&branch_id=${branch ? branch : nearestBranch.id}&product_id=${product_id}&sortby=${sortby}&order=${order}&page=${page}&size=${size}`,
                {},);
            console.log("name", name);
            // console.log("branch_id", branch_id);
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
    }, [category, stock, branch, product_id, sortby, order, page, size, specialPrice]);

    // Print list of products
    const printAllStock = () => {
        console.log("ini isi showStock :", showStock);
        let print = showStock.map((val, idx) => {
            console.log("ini val :", val);
            return(
                <div>
                    <Product 
                        name={val.name} 
                        productimage={val.image} 
                        price={val.price}
                        specialPrice={val.discount?.specialPrice}
                        productId={val.id} 
                        stock={stock} 
                    />
                </div>
            )
        });
        return print;
    }

    // Pagination
    const paginate = pageNumbers => {
        setPage(pageNumbers);
    };

    console.log(`The nearest branch is km away.`, nearestBranch);

    //// --- CATEGORY BRANCH --- ////

    const [categoryBranch, setCategoryBranch] = useState([]);
    const [imageCategory, setImageCategory] = React.useState("");

    console.log("Data from Category Branch :", categoryBranch)

    const getCategoryBranch = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/categorybranch?branch_id=${branch ? branch : nearestBranch.id}`)
            setCategoryBranch(response.data.data);
            console.log("Data from getcategoryBranch :", response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getCategoryBranch();
    }, [branch]);

    const printCategoryBranch = () => {
        return categoryBranch.map((val,idx) => (
          <div key={val.id}>
            <ProductCategories 
                category={val.category}
                categoryId={val.id}
                imageCategory={val.imageCategory}
            />
          </div>
        ));
      };

    //// --- PRODUCT CATEGORY NAVIGATION --- ////
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
          sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
      };
    const scrollRight = () => {
        if (sliderRef.current) {
          sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    //// --- HANDLE PRODUCT TO DISPLAY ON SMALL SCREEN --- ////
    React.useEffect(() => {
        const handleResize = () => {
          const screenWidth = window.innerWidth;
          if (screenWidth >= 1200) {
            setSize(6);
          } else if (screenWidth >= 768) {
            setSize(6);
          } else if (screenWidth >= 480) {
            setSize(4);
          } else {
            setSize(2);
          }
        };
        handleResize(); // Call the handler initially
        window.addEventListener('resize', handleResize); // Add event listener for resize
      
        return () => {
          window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
      }, []);

    return (<div>
        <Header/>
        <Promo />
        {/* --- PRODUCT CATEGORY --- */}
        <Box 
            py={8} 
            mt={8} 
            px={10} 
            backgroundColor="whitesmoke"
        >
          <Heading fontSize="xl">Categories</Heading>
          <Flex
            justifyContent='space-between'
            mt={4}
            alignItems="center"
          >
            {/* Left navigation button */}
            <IconButton
                icon={<AiOutlineDoubleLeft />}
                onClick={scrollLeft}
                aria-label="Scroll Left"
                size="sm"
                variant="ghost"
            />
            <Flex
              ref={sliderRef}
              overflowX="scroll"
              flexWrap="nowrap"
              justifyContent="flex-start"
              gap={2}
              align="start"
              css={{
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
              }}
            >
              {printCategoryBranch()}
            </Flex>
            {/* Right navigation button */}
            <IconButton
              icon={<AiOutlineDoubleRight />}
              onClick={scrollRight}
              aria-label="Scroll Right"
              size="sm"
              variant="ghost"
            />
          </Flex>
        </Box>
        <>
            {/* INI PRODUCT */}
            <Flex 
                justify={'center'}
            >
                <Box 
                    paddingTop='4' 
                    pb='8'
                    display={'flex'}
                    flexDir={'column'}
                    justifyContent='start' 
                    alignItem='start'
                >
                    <Flex 
                        p={{ base: '4', lg: '2' }}
                        mx={{base: '-4', sm:'2', md:'4'}}
                        mb={'1'}
                    >
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<FiFilter />}
                                variant='outline'
                                // color='green.400'
                                colorScheme='green'
                                _expanded={{ bg: 'white', color: 'green.500' }}
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
                            {/* <Text onChange={(e) => setBranch_Id(e.target.value)} mt={"10px"}></Text> */}
                            <Location nearestBranch={nearestBranch} setNearestBranch={setNearestBranch} />
                        </GridItem>
                    </Flex>
                    <Flex 
                        minHeight="85vh" 
                        maxW='8xs' 
                        flexWrap='wrap' 
                        justifyContent='space-between' 
                        alignItem='start'
                        flexDir={'column'}
                        mx={{base: '6'}}
                        marginBottom={'auto'}
                    >
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
    </div>);

}

export default Landing;