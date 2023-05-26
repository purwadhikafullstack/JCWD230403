import React, { useState } from 'react';
import { Flex, Box, Menu, MenuButton, MenuItem, MenuList, IconButton, Text, SimpleGrid, GridItem, Heading, Select, Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import Product from '../Components/product';
import { FiFilter } from 'react-icons/fi';
import Pagination from '../Components/Pagination';
import Location from '../Components/Location';
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux';
import { setActiveBranch } from '../Reducers/authUser';
import { useParams, useLocation } from 'react-router-dom';




function ProductLanding(props) {
  let token = localStorage.getItem('grocery_login');
  const userName = useSelector((state) => state.authUserReducer.name);
  const roleId = useSelector((state) => state.authUserReducer.roleId);
  const branch = useSelector((state) => state.authUserReducer.branchId);
  const dispatch = useDispatch();

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
  // const [category, setCategory] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [product_id, setProduct_id] = React.useState("");
  const [nearestBranch, setNearestBranch] = React.useState({
    id: 1
  });
  const [specialPrice, setSpecialPrice] = React.useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');


  const getAllStock = async () => {
    try {
      let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product/allstock?category=${category}&stock=${stock}&branch_id=${branch ? branch : nearestBranch.id}&product_id=${product_id}&sortby=${sortby}&order=${order}&page=${page}&size=${size}`,
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
  }, [category, stock, branch, product_id, sortby, order, page, size, specialPrice]);

  // Print list of products
  const printAllStock = () => {
    console.log("ini isi showStock :", showStock);
    let print = showStock.map((val, idx) => {
      console.log("ini val :", val);
      return (
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
  };

  // Pagination
  const paginate = pageNumbers => {
    setPage(pageNumbers);
  };

  console.log(`The nearest branch is km away.`, nearestBranch);

  // --- GET ADDRESS USER --- //
  const [userAddress, setUserAddress] = useState([])
  const getUserAddress = async () => {
      try {
          let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/address/useraddress/`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setUserAddress(response.data.data)
          console.log('Data from user address in header :', response.data.data);
      } catch (error) {
          console.log(error);
      }
  }

  React.useEffect(() => {
    getUserAddress();
  }, [])

  // --- SELECTED ADDRESS BY USER --- //
  const handleAddressChange = (event) => {
    dispatch(setActiveBranch(event.target.value))
  };

  return (
    <Flex
      flexDir={'column'}
    >
      {
        token ? (
          <Box
            pt={'1.5'}
            px={{ base: '4', sm: '8', md: '20', lg: '20' }}
          >
            <Flex
              gap={'2'}
              alignItems={'baseline'}
            >
              <Text
                fontSize={{ base: 'xs', sm: 'sm' }}
                color={'gray.500'}
                letterSpacing={'tighter'}
              >
                Address:
              </Text>
              <Box>
                <Select
                  size={'xs'}
                  variant={'unstyled'}
                  icon={'none'}
                  value={branch}
                  onChange={handleAddressChange}
                  letterSpacing={'tighter'}
                >
                  {userAddress.map((address) => {
                    return (
                      <option
                        key={address.id}
                        value={address.branchId}
                      >
                        {address.addressLine}, {''}
                        {address.subDistrict}, {''}
                        {address.province}, {''}
                        {address.city}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>
          </Box>) : null
      }
      <>
        {/* INI PRODUCT */}
        <Flex
          justify={'center'}
        >
          <Box
            paddingTop='4' pb='8'
          >
            <Flex
              p={{ base: '4', lg: '2' }}
              mx={'16'}
              mb={'2'}
            >
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<FiFilter />}
                  variant='outline'
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
                {/* <Heading size={"sm"} fontWeight="semibold">Location</Heading> */}
                <Text onChange={(e) => setBranch_Id(e.target.value)} mt={"10px"}>
                </Text>
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
    </Flex>
  )
};

export default ProductLanding;




