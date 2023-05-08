import React, { useState } from 'react';
import { 
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {BsArrowUpCircle, BsArrowDownCircle, BsBoxes} from 'react-icons/bs';
import {GoVerified, GoUnverified, GoSearch} from 'react-icons/go';
import {IoIosArrowDropup, IoIosArrowDropdown} from 'react-icons/io';
import {FaUsers, FaUserCog} from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../helper';
import SalesChart from '../Components/SalesChart';
import OrderChart from '../Components/OrderChart';
import Pagination from '../Components/Pagination';


function AdminLanding() {
  let token = localStorage.getItem('grocery_login');
  const name = useSelector((state) => state.authAdminReducer.name);
  const branch = useSelector((state) => state.authAdminReducer.branchId);
  const roleId = useSelector((state) => state.authAdminReducer.roleId);
  
  ////////// BRANCH LIST OPTION //////////
  const [branchId, setBranchId] = useState(branch);
  const [selectBranch, setSelectBranch] = useState(branchId)

  console.log('Ini Branch yang sedang di pilih :', selectBranch);

  React.useEffect(() => {
    setBranchId(selectBranch);
  }, [selectBranch])

  const branches = {
    1: 'Jakarta',
    2: 'Bandung',
    3: 'Bogor',
    4: 'Bali',
    5: 'Surabaya'
  }

  const branchName = () => {
    // return branches[branchId] || '';
    if (selectBranch) {
      return branches[branchId]
    } else {
      return 'All Branches'
    }
  }

   ////////// ADMIN BRANCH LIST //////////
   const [adminPage, setAdminPage] = useState(0);
   const [adminSize] = useState(5);
   const [adminSort, setAdminSort] = useState("name");
   const [adminOrder, setAdminOrder] = useState("asc");
   const [adminFilter, setAdminFilter] = useState('');
   const [adminTotalData, setAdminTotalData] = useState(0);
   const [adminBranch, setAdminBranch] = useState([]);
   const getAdminBranch = async () => {
     try {
       let response = await axios.get(`${API_URL}/admin/adminbranchlist?branchId=${branchId}&page=${adminPage}&size=${adminSize}&sortby=${adminSort}&order=${adminOrder}&name=${adminFilter}`, {
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
       console.log("ini data dari adminBranchList :", response);
       console.log("type dari response data :", typeof response.data);
       setAdminBranch(response.data.data)
       console.log("data dari set admin branch :", response.data.data);
       setAdminTotalData(response.data.datanum)
       console.log("Ini Jumlah Admin :", response.data.datanum);
     } catch (error) {
       console.log(error);
     }
   }
   console.log("Ini Hasil Response Jumlah Admin :", adminTotalData);
 
   const printAdminBranch = () => {
     return adminBranch.map((val, idx) => {
       return (
         <Tr key={idx}>
           {/* <Td>{idx + 1}</Td> */}
           <Td 
             w={'40%'}
           >
             {val.name}
           </Td>
           <Td>{val.branch?.name}</Td>
           <Td>
             <Box
               // bg={val.isDeleted ? 'red.500' : 'green.500'}
               color={val.isDeleted ? 'red.500' : 'green.500'}
               // p={'1'}
               py={'1'}
               borderRadius={'md'}
               textAlign={'center'}
             >
               {val.isDeleted ? 'Inactive' : 'Active' }
             </Box>
           </Td>
         </Tr>
       )
     })
   }

   const adminPaginate = pageNumber => {
    setAdminPage(pageNumber);
  }

  React.useEffect(() => {
    getAdminBranch();
  }, [adminPage, adminSize, adminSort, adminOrder, adminFilter, branchId]);

  ////////// SORTING BY NAME & STATUS FOR ADMIN //////////
  const handleSort = (sortbyData) => {
    if (adminSort === sortbyData) {
      setAdminOrder(adminOrder === 'ASC' ? 'DESC' : 'ASC');
    } else if (sortbyData === 'isDeleted') {
      setAdminSort(sortbyData);
      setAdminOrder(adminOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setAdminSort(sortbyData);
      setAdminOrder('ASC');
    }
  }

  ////////// USER BRANCH LIST //////////
  const [userPage, setUserPage] = useState(0);
  const [userSize] = useState(5);
  const [userSort, setUserSort] = useState("name");
  const [userOrder, setUserOrder] = useState("asc");
  const [userFilter, setUserFilter] = useState('');
  const [userTotalData, setUserTotalData] = useState(0);
  const [userBranch, setUserBranch] = useState([]);
  const getUserBranch = async () => {
    try {
      let response = await axios.get(`${API_URL}/user/userbranchlist?branchId=${branchId}&page=${userPage}&size=${userSize}&sortby=${userSort}&order=${userOrder}&name=${userFilter}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserBranch(response.data.data)
      setUserTotalData(response.data.datanum)
      console.log('Ini Jumlah User :', response.data.datanum);
    } catch (error) {
      console.log(error);
    }
  }
  console.log('Ini hasil Response Jumlah User :', userTotalData);

  const printUserBranch = () => {
    return userBranch.map((val, idx) => {
      return (
        <Tr key={idx} >
          <Td
            w={'40%'}
          >
            <Flex 
              alignItems={'center'} 
              justifyContent={'space-between'}
              w={'85%'}
            >
              {val.name}
              <Box>
                {val.isVerified ? (
                  <Box color='blue.400'>
                    <GoVerified/>
                  </Box>) : (
                  <Box color='gray.500'>
                    <GoUnverified/>
                  </Box>)
                }
              </Box>
            </Flex>
          </Td>
          <Td>{val.branch?.name}</Td>
          <Td>
            <Box
              color={val.isDeleted ? 'red.500' : 'green.500'}
              py={'1'}
              borderRadius={'md'}
              textAlign={'center'}
            >
              {val.isDeleted ? 'Inactive' : 'Active' }
            </Box>
          </Td>
        </Tr>
      )
    })
  }

  const userPaginate = pageNumber => {
    setUserPage(pageNumber);
  }

  React.useEffect(() => {
    getUserBranch();
  }, [userPage, userSize, userSort, userOrder, userFilter, branchId]);

  ////////// SORTING BY NAME FOR USER //////////
  const handleSortUser = (userSortbyData) => {
    if (userSort === userSortbyData) {
      setUserOrder(userOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setUserSort(userSortbyData);
      setUserOrder('ASC');
    }
  }

  ////////// PRODUCT BRANCH LIST ////////// 
  const [branch_id, setBranch_id] = useState(selectBranch);
  
  React.useEffect(() => {
    setBranch_id(selectBranch);
  }, [selectBranch]);

  const [productPage, setProductPage] = useState(0);
  const [productSize] = useState(5);
  const [productSort, setProductSort] = useState("name");
  const [productOrder, setProductOrder] = useState("asc");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState("");
  const [productBranchName, setProductBranchName] = useState('');
  const [product_id, setProduct_id] = useState("");
  const [productFilter, setProductFilter] = useState('');
  const [productTotalData, setProductTotalData] = useState(0);
  const [productBranch, setProductBranch] = useState([]);
  const getProductBranch = async () => {
    try {
      let response = await axios.get(`${API_URL}/product/productlist?branch_id=${branch_id}&page=${productPage}&size=${productSize}&sortby=${productSort}&order=${productOrder}&name=${productName}&category=${productCategory}&stock=${productStock}&branchname=${productBranchName}`, {

      });
      setProductBranch(response.data.data);
      setProductTotalData(response.data.datanum);
      console.log("ini Jumlah Product :", response.data.datanum);
    } catch (error) {
      console.log(error);
    }
  }

  console.log('Ini Hasil Response Jumlah Product :', productTotalData);

  const printProductBranch = () => {
    return productBranch
    .map((val, idx) => {
      return (
        <Tr 
          key={idx}
        >
          <Td>{val.name}</Td>
          <Td>{val.category?.category}</Td>
          <Td textAlign={'center'} >{val.price}</Td>
          <Td textAlign={'center'} >{val.stockBranches[0]?.stock}</Td>
        </Tr>
      )
    })
  }

  console.log('Ini data dari printProductBranch :', productBranch)

  const productPaginate = pageNumber => {
    setProductPage(pageNumber);
  }

  React.useEffect(() => {
    getProductBranch();
  }, [productPage, 
      productSize, 
      productSort, 
      productOrder, 
      productStock, 
      productCategory,
      productName,
      product_id, 
      branch_id]);
  
  ////////// SORTING BY NAME & PRICE FOR PRODUCT //////////
  const handleSortProduct = (productSortbyData) => {
    if (productSort === productSortbyData) {
      setProductOrder(productOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setProductSort(productSortbyData);
      setProductOrder('ASC');
    }
  }

  //////// SORTING BY CATEGORY FOR PRODUCT //////////
  const handleSortCategory = () => {
    if (productSort === 'category') {
      setProductOrder(productOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setProductSort('category');
      setProductOrder('ASC');
    }
  }

  //////// SORTING BY STOCK FOR PRODUCT //////////
  const handleSortStock = () => {
    if (productSort === 'stock'){
      setProductOrder(productOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setProductSort('stock')
      setProductOrder('ASC')
    }
  }

    return ( 
      <Flex
        w={{base: '100%', sm: '100%', md:'90%', lg: '85%'}}
        // backgroundColor={'blue.100'}
        flexDir={{base:'column', sm:'column', md:'row'}}
      >
        <Flex
          w={{base: '100vw', sm: '100vw', md:'60vw', lg: '55vw'}}
          // backgroundColor={'yellow.100'}
          flexDir={'column'}
          overflow={'auto'}
          minH={'100%'}
          textAlign={'start'}
          p={'2%'}
          css={{
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}
        >
          <Flex justifyContent={'space-between'}>
            <Box>
              <Heading fontSize='xl' letterSpacing={'tight'} fontWeight={'normal'}>Welcome, <Flex display={'inline-flex'} fontWeight={'bold'}>{name}</Flex></Heading>
              <Text pt={'1'} color={'gray'} fontSize={'sm'}>Location <Flex display={'inline-flex'} fontWeight={'bold'}>{branchName()}</Flex></Text>
            </Box>
            {/* THE BRANCH CAN BE SELECTED */}
            {
              roleId === 1 ? 
              (
                <Box>
                  <Select 
                    placeholder='All Branches' 
                    size='xs' 
                    variant='flushed'
                    onChange={(element) => setSelectBranch(element.target.value)}
                    value={selectBranch}
                  >
                    <option value='1'>Jakarta</option>
                    <option value='2'>Bandung</option>
                    <option value='3'>Bogor</option>
                    <option value='4'>Bali</option>
                    <option value='5'>Surabaya</option>
                  </Select>
                </Box>
              ) : null
            }
          </Flex>
          {/* ///////// LIST ADMIN, USER, & PRODUCT ///////// */}
          <Flex 
            py={'6'} 
            justifyContent={'space-evenly'}
            flexDir={{base:'column', sm:'column', md:'row', lg: 'row'}}
            w={{base: '65%', sm: '50%', md: '100%'}}
            mx={{base: 'auto', sm: 'auto', md: null, lg: null}}
            gap={{base: '2', sm: '3', md: null, lg: null}}
          >
            <Box 
              backgroundColor={'green.400'} 
              p={'3'} 
              rounded={'lg'}
            >
              <Flex 
                alignItems={'center'} 
                gap={'2'}
                justifyContent={{base:'space-evenly', sm:'space-evenly', md: null, lg: null}}
              >
                <Box 
                  textAlign={'center'} 
                  maxH={'12'} 
                  width={'12'} 
                  color={'green.500'} 
                  backgroundColor={'white'} 
                  p={'2'} 
                  rounded={'full'}
                >
                  <Icon 
                    fontSize={'3xl'} 
                    as={FaUserCog} 
                  />
                </Box>
                <Box 
                  color={'white'} 
                  textAlign={'center'}
                >
                  <Text>Total Admins</Text>
                  {adminTotalData}
                </Box>
              </Flex>
            </Box>
            <Box 
              backgroundColor={'green.400'} 
              p={'3'} 
              rounded={'lg'}
            >
              <Flex 
                alignItems={'center'} 
                gap={'2'}
                justifyContent={{base:'space-evenly', sm:'space-evenly', md: null, lg: null}}
              >
                <Box 
                  textAlign={'center'} 
                  maxH={'12'} 
                  width={'12'} 
                  color={'green.500'} 
                  backgroundColor={'white'} 
                  p={'2'} 
                  rounded={'full'}
                >
                  <Icon 
                    fontSize={'3xl'} 
                    as={FaUsers} 
                  />
                </Box>
                <Box 
                  color={'white'} 
                  textAlign={'center'}
                >
                  <Text>Total Users</Text>
                  {userTotalData}
                </Box>
              </Flex>
            </Box>
            <Box 
              backgroundColor={'green.400'} 
              p={'3'} 
              rounded={'lg'}
            >
              <Flex 
                alignItems={'center'} 
                gap={'2'}
                justifyContent={{base:'space-evenly', sm:'space-evenly', md: null, lg: null}}
              >
                <Box 
                  textAlign={'center'} 
                  maxH={'12'} 
                  width={'12'} 
                  color={'green.500'} 
                  backgroundColor={'white'} 
                  p={'2'} 
                  rounded={'full'}
                >
                  <Icon 
                    fontSize={'3xl'} 
                    as={BsBoxes} 
                  />
                </Box>
                <Box 
                  color={'white'} 
                  textAlign={'center'}
                >
                  <Text>Total Products</Text>
                  {productTotalData}
                </Box>
              </Flex>
            </Box>
          </Flex>
          {/* ///////// CHARTS LIST ///////// */}
          {/* --- SALES --- */}
          <Box 
            py={'4'} 
            textAlign={'center'}
          >
            <Heading 
              py={'2'} 
              size={'md'} 
            >
              Revenue Sales Report
            </Heading>
            <SalesChart/>
          </Box>
          {/* --- ORDER --- */}
          <Box 
            alignSelf={'center'}
          >
            <Box 
              py={'4'} 
              textAlign={'center'} 
              w={{base: 'none', sm: 'none',md:'40vw', lg: '40vw'}}
            >
              <Heading 
                py={'2'} 
                size={'md'}
              >
                Order Progress Tracker
              </Heading>
              <OrderChart/>
            </Box>
          </Box>
          {/* ///// PRODUCT LIST TITLE AND FILTER ///// */}
          <Box>
            <Flex
              justifyContent={'space-between'}
              mt={'4'}
              mx={{base: '1.5', sm: '1.5', md: '2', lg: '4'}}
            >
              <Flex
                alignItems={{base: 'start', sm:'start', md: 'baseline', lg: 'baseline'}}
                flexDir={{base: 'column', sm: 'column', md: 'inherit', lg: 'inherit'}}
              >
                <Heading 
                  size={'md'} 
                  letterSpacing={'tight'} 
                >
                  Product List
                </Heading>
                <Text 
                  fontSize={'sm'} 
                  color={'gray'} 
                  ml={{base: '0', sm: '0', md:'2', lg: '2'}}
                >
                    <Flex 
                      // display={'inline-flex'}
                      fontWeight={'bold'}
                    >
                      {branchName()}
                    </Flex>
                </Text>
              </Flex>
              <Input
                h={'1.5rem'}
                placeholder='Filter by name' 
                size="sm" 
                w={{base:'39%', sm: '40%', md:'25%', lg:'25%'}}
                type={'search'} 
                rounded={'lg'} 
                backgroundColor={'white'}
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
            </Flex>
            {/* ///////// TABLE OF BRANCH PRODUCT LIST ///////// */}
            <Flex
              // backgroundColor={'skyblue'}
              h={'15rem'}
              flexDir={'column'}
              justifyContent={'space-between'}
            >
              <Flex 
                overflow={'auto'}
              >
                <Table 
                  variant={'unstyled'} 
                  mt={'4'}
                  size={'sm'}
                  sx={{
                    td:{
                      p:'0.45rem 0.5rem',
                      borderBottom: 'none'
                    },
                    th: {
                      p:'0.45rem 0.5rem',
                      borderBottom: 'none'
                    }
                  }}
                  mx={{base: '0.5', sm: '1', md:'4', lg: '8'}}
                >
                  <Thead>
                    <Th
                      fontWeight={'semibold'}
                      onClick={() => handleSortProduct('name')}
                    >
                      <Flex 
                        alignItems={'center'}
                      >
                        Product
                        <Icon 
                            as={
                              productSort === 'name' && productOrder === 'ASC' ?
                              IoIosArrowDropdown : IoIosArrowDropup
                              }
                          />
                      </Flex>
                    </Th>
                    <Th
                      fontWeight={'semibold'}
                      onClick={() => handleSortCategory()}
                    >
                      <Flex 
                        alignItems={'center'}
                      >
                        Category 
                        <Icon 
                            as={
                              productSort === 'category' && productOrder === 'ASC' ?
                              IoIosArrowDropdown : IoIosArrowDropup
                              }
                          />
                      </Flex>
                    </Th>
                    <Th 
                      textAlign={'center'}
                      fontWeight={'semibold'}
                      onClick={() => handleSortProduct('price')}
                    >
                      <Flex 
                        alignItems={'center'} 
                        justifyContent={'center'}
                      >
                        Price
                        <Icon 
                            as={
                              productSort === 'price' && productOrder === 'ASC' ?
                              IoIosArrowDropdown : IoIosArrowDropup
                              }
                          />
                      </Flex>
                    </Th>
                    <Th 
                      textAlign={'center'}
                      fontWeight={'semibold'}
                      onClick={() => handleSortStock()}
                    >
                      <Flex 
                        alignItems={'center'} 
                        justifyContent={'center'}
                      >
                        Stock
                        <Icon 
                            as={
                              productSort === 'stock' && productOrder === 'ASC' ?
                              IoIosArrowDropdown : IoIosArrowDropup
                              }
                          />
                      </Flex>
                    </Th>
                  </Thead>
                  <Tbody>
                    {printProductBranch()}
                  </Tbody>
                </Table>
              </Flex>
              <Flex justifyContent={'center'}>
                <Pagination 
                  page={productPage} 
                  size={productSize} 
                  totalData={productTotalData} 
                  paginate={productPaginate}/>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        {/* RIGHT SIDE */}
        <Flex
          w={{base: '100vw', sm: '100vw', md:'30vw', lg: '30vw'}}
          minW={{ base: null, sm: null, md: '30vw', lg: '30vw'}}
          h={'auto'}
          flexDir={{base:'column', sm:'column', md:'row', lg: 'row'}}
          backgroundColor={'gray.100'}
          mt={{base: '4', sm: '4', md: '0', lg: '0'}}
          pb={{base: '2', sm: '2', md: '0', lg: '0'}}
        >
          <Box>
            {/* ///////// TABLE OF BRANCH ADMIN LIST ///////// */}
            <Box 
              h={{base: '45vh', sm: '45vh', md:'50%', lg: '50%'}}
              w={{base: '100vw', sm: '100vw',md:'30vw', lg: '30vw'}}
              // backgroundColor={'lightcoral'}
              textAlign={'start'}
              p={'2%'}
              pt={'2.5%'}
              flexDir={'column'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Heading 
                  ml={'1'} 
                  fontSize='md' 
                  letterSpacing={'tight'} 
                  fontWeight={'normal'}
                  as={'u'}
                >
                  Branch Admin
                </Heading>
                <Input
                  h={'1.5rem'}
                  placeholder='Filter by name' 
                  size="sm" 
                  w={{base:'37%', sm: '48%', md:'39%', lg:'39%'}}
                  type={'search'} 
                  rounded={'lg'} 
                  backgroundColor={'white'}
                  value={adminFilter}
                  onChange={(event) => setAdminFilter(event.target.value)}
                />
              </Flex>
              <Flex
                flexDir={'column'}
                marginBottom={'auto'}
              >
                <Flex 
                  overflow={'auto'}
                >
                  <Table 
                    ml={'-3'} 
                    variant={'unstyled'} 
                    mt={'1'}
                    size={'sm'}
                  >
                    <Thead>
                      <Th 
                        fontWeight={'semibold'}
                        onClick={() => handleSort('name')}
                      >
                        <Flex alignItems={'center'}>
                        Name
                        <Icon 
                          as={
                            adminSort === 'name' && adminOrder === 'ASC' ?
                              IoIosArrowDropup : IoIosArrowDropdown
                            }
                        />
                        </Flex>
                      </Th>
                      <Th 
                        fontWeight={'semibold'}
                      >
                        Branch
                      </Th>
                      <Th 
                        fontWeight={'semibold'}
                        onClick={() => handleSort('isDeleted')}
                        textAlign={'center'}
                      >
                        <Flex 
                          justifyContent={'center'} 
                          alignItems={'center'}
                        >
                          Status
                          <Icon 
                            as={
                              adminSort === 'isDeleted' && adminOrder === 'ASC' ?
                              IoIosArrowDropdown : IoIosArrowDropup
                              }
                          />
                        </Flex>
                      </Th>
                    </Thead>
                    <Tbody textAlign={'center'}>
                      {printAdminBranch()}
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
              <Flex justifyContent={'center'}>
                <Pagination 
                  page={adminPage} 
                  size={adminSize} 
                  totalData={adminTotalData} 
                  paginate={adminPaginate}/>
              </Flex>
            </Box>
            {/* ///////// TABLE OF BRANCH CUSTOMER LIST ///////// */}
            <Box
              h={{base: '45vh', sm: '45vh', md:'50%', lg: '50%'}}
              w={{base: '100vw', sm: '100vw',md:'30vw'}}
              // backgroundColor={'skyblue'}
              textAlign={'start'}
              p={'2%'}
              pt={'2.5%'}
              flexDir={'column'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Heading 
                  fontSize='md' 
                  letterSpacing={'tight'} 
                  fontWeight={'normal'}
                  as={'u'}
                >
                  Customer
                </Heading>
                <Input 
                  h={'1.5rem'}
                  placeholder='Filter by name' 
                  size="sm" 
                  w={{base:'37%', sm: '48%', md:'39%', lg:'39%'}}
                  type={'search'} 
                  rounded={'lg'} 
                  backgroundColor={'white'}
                  value={userFilter}
                  onChange={(event) => setUserFilter(event.target.value)}
                />
              </Flex>
              <Flex
                flexDir={'column'}
                marginBottom={'auto'}
              >
                <Flex 
                  overflow={'auto'}
                >
                  <Table 
                    ml={'-4'} 
                    variant={'unstyled'} 
                    mt={'1.5'}
                    size={'sm'}
                  >
                    <Thead>
                      <Th 
                        fontWeight={'semibold'} 
                        onClick={() => handleSortUser('name')}
                      >
                        <Flex alignItems={'center'}>
                          Name
                          <Icon 
                            as={
                              userSort === 'name' && userOrder === 'ASC' ?
                              IoIosArrowDropdown : IoIosArrowDropup
                              }
                          />
                        </Flex>
                      </Th>
                      <Th 
                        fontWeight={'semibold'}
                      >
                        Branch 
                      </Th>
                      <Th 
                        fontWeight={'semibold'}
                        textAlign={'center'}
                      >
                        Status 
                      </Th>
                    </Thead>
                    <Tbody textAlign={'center'}>
                      {printUserBranch()}
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
              <Flex justifyContent={'center'}>
                <Pagination
                  page={userPage}
                  size={userSize}
                  totalData={userTotalData}
                  paginate={userPaginate}
                />
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
     );
}

export default AdminLanding;