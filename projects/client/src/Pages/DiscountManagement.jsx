import React, { useState } from 'react';
import {
    Box,
    Flex,
    Table,
    TableContainer,
    Text,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Switch,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Select,
    FormControl,
    FormLabel,
    useDisclosure,
    useToast,
    Icon,
    Divider,
    useBreakpointValue,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel
  } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../helper';
import Pagination from '../Components/Pagination';
import { FaRegEdit } from 'react-icons/fa';
import { CiDiscount1 } from 'react-icons/ci';
import {IoIosArrowDropup, IoIosArrowDropdown} from 'react-icons/io';

function DiscountManagement() {
    let token = localStorage.getItem('grocery_login');
    const name = useSelector((state) => state.authAdminReducer.name);
    const branch = useSelector((state) => state.authAdminReducer.branchId);
    const roleId = useSelector((state) => state.authAdminReducer.roleId);
    const toast = useToast();

    const [branchId, setBranchId] = useState(branch);

    //////////--- DISCOUNT BRANCH LIST ---//////////
    const [branch_id, setBranch_id] = useState(branch)
    const [discountPage, setDiscountPage] = useState(0);
    const [discountSize] = useState(10);
    const [discountSort, setDiscountSort] = useState('id');
    const [discountOrder, setDiscountOrder] = useState('DESC');
    const [nameDiscount, setNameDiscount] = useState('');
    const [dicountTotalData, setDiscountTotalData] = useState(0);
    const [discountBranch, setDiscountBranch] = useState([]);
    const getDiscountBranch = async () => {
        try {
            let response = await axios.get(`${API_URL}/discount/discountlist?branch_id=${branch_id}&page=${discountPage}&size=${discountSize}&sortby=${discountSort}&order=${discountOrder}&nameDiscount=${nameDiscount}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDiscountBranch(response.data.data);
            setDiscountTotalData(response.data.datanum);
        } catch (error) {
            console.log(error);
        }
    }

    const selectedBranchId = branch
    const isMobile = useBreakpointValue({base: true, sm: true, md: false})

    const printDiscountBranch = () => {
        return discountBranch
        .map((val,idx) => {
            const stockBranch = selectedBranchId ? val.product.stockBranches.find((sb) => sb.branch_id === selectedBranchId) : null;
            const stock = stockBranch ? stockBranch.stock : 'out of stock';
            const productId = stockBranch ? stockBranch.product_id : null;
            if(isMobile) {
                return (
                    <Accordion 
                        allowMultiple
                        key={val.id}
                        data-product-id={productId}
                    >
                        <AccordionItem
                            px={'1'} style={{ overflowY: 'auto', maxHeight: '150px' }}
                        >
                            <AccordionButton>
                                <Box 
                                    flex="1" 
                                    textAlign="left"
                                >
                                    <Text
                                        fontSize="lg"
                                    >
                                        <span style={{ marginRight: '10px', display: 'inline-block', textAlign: 'center', minWidth: '20px' }}>{idx + 1}.</span>
                                        {val.nameDiscount}
                                    </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <Box
                                    w="100%" mb="4"
                                >
                                    <Text fontWeight="bold">Special Price:</Text>
                                    <Text>{val.specialPrice}</Text>
                                </Box>
                                <Box
                                    w="100%" mb="4"
                                >
                                    <Text fontWeight="bold">Active Date:</Text>
                                    <Text>{val.activeDate}</Text>
                                </Box>
                                <Box
                                    w="100%" mb="4"
                                >
                                    <Text fontWeight="bold">End Date:</Text>
                                    <Text>{val.endDate}</Text>
                                </Box>
                                <Box
                                    w="100%" mb="4"
                                >
                                    <Text fontWeight="bold">Product Name:</Text>
                                    <Text>{val.product?.name}</Text>
                                </Box>
                                <Flex 
                                    alignItems={'center'}
                                    w={'100%'}
                                    justifyContent={'space-evenly'}
                                    gap={'2'}
                                >
                                    <Switch 
                                        colorScheme='red'
                                        isChecked={val.isDeleted}
                                        onChange={() => {
                                            onBtnDelete(val.id, !val.isDeleted);
                                        }}
                                    />
                                    <Box
                                      color={val.isDeleted ? 'red.500' : 'green.500'}
                                      textAlign={'center'}
                                      p={'1'}
                                    >
                                      {val.isDeleted ? 'Disable' : 'Enable'}
                                    </Box>
                                </Flex>
                                <Button
                                    leftIcon={<FaRegEdit/>} 
                                    colorScheme='blue' 
                                    variant='ghost'
                                    p={'2'}
                                    pt={'3'}
                                    size='xs'
                                    letterSpacing={'tight'}
                                    onClick={() => {
                                        onOpenEditBtn(
                                            val.id,
                                            val.nameDiscount,
                                            val.specialPrice,
                                            val.activeDate,
                                            val.endDate,
                                            val.productId
                                        )
                                    }}
                                >
                                    Edit
                                </Button>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                )
            } else {
                return (
                    <Tr 
                        key={val.id}
                        data-product-id={productId}
                    >
                        <Td 
                            textAlign={'center'}
                        >
                            {idx + 1}
                        </Td>
                        <Td
                            textAlign={'start'}
                        >
                            <Flex
                                alignItems={'center'}
                                w={'90px'}
                            >
                                {val.nameDiscount}
                            </Flex>
                        </Td>
                        <Td>
                            <Box
                                textAlign={'center'}
                            >
                                <Flex
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    w={'90px'}
                                >
                                    {val.specialPrice}
                                </Flex>
                            </Box>
                        </Td>
                        <Td
                            textAlign={'center'}
                        >
                            {val.activeDate}
                        </Td>
                        <Td
                            textAlign={'center'}
                        >
                            {val.endDate}
                            </Td>
                        <Td 
                            textAlign={'start'}
                        >
                            {val.product?.name}
                        </Td>
                        <Td>
                            <Flex 
                                alignItems={'center'}
                                w={'90px'}
                                justifyContent={'space-between'}
                                gap={'4'}
                            >
                            <Switch 
                                colorScheme='red'
                                isChecked={val.isDeleted}
                                onChange={() => {
                                    onBtnDelete(val.id, !val.isDeleted);
                                }}
                            />
                            <Box
                              color={val.isDeleted ? 'red.500' : 'green.500'}
                              textAlign={'center'}
                              p={'1'}
                            >
                              {val.isDeleted ? 'Disable' : 'Enable'}
                            </Box>
                            </Flex>
                        </Td>
                        <Td>
                            <Button
                                leftIcon={<FaRegEdit/>} 
                                colorScheme='blue' 
                                variant='ghost'
                                p={'2'} 
                                size='xs'
                                letterSpacing={'tight'}
                                onClick={() => {
                                    onOpenEditBtn(
                                        val.id,
                                        val.nameDiscount,
                                        val.specialPrice,
                                        val.activeDate,
                                        val.endDate,
                                        val.productId
                                    )
                                }}
                            >
                                Edit
                            </Button>
                        </Td>
                    </Tr>
                )
            }
        })
    }

    const discountPaginate = pageNumber => {
        setDiscountPage(pageNumber)
    }

    React.useEffect(() => {
        getDiscountBranch();
    }, [discountPage,
        discountSize,
        discountSort,
        discountOrder,
        nameDiscount,
        // product_id,
        branch_id]);

    ////////// SORTING BY NAME DISCOUNT //////////
    const handleSortDiscount = (discountSortybyData) => {
        if(discountSort === discountSortybyData) {
            setDiscountOrder(discountOrder === 'ASC' ? 'DESC' : 'ASC')
        } else {
            setDiscountSort(discountSortybyData);
            setDiscountOrder('ASC')
        }
    }

    //////////--- ADD NEW DISCOUNT BRANCH LIST ---//////////
    const { 
        isOpen: isOpenDiscount, 
        onOpen: onOpenDiscount, 
        onClose: onCloseDiscount 
        } = useDisclosure();
    const handleCloseModal = () => {
        onCloseDiscount();
        setCreateNameDiscount('');
        setCreateProductName('');
        setCreateSpecialPrice('');
        setCreateActiveDate('');
        setCreateEndDate('');
        setSelectedProductPrice('');
        setPricePercent('');
      }
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [createNameDiscount, setCreateNameDiscount] = useState('');
    const [createSpecialPrice, setCreateSpecialPrice] = useState('');
    const [createActiveDate, setCreateActiveDate] = useState('');
    const [createEndDate, setCreateEndDate] = useState('');
    const [createProductName, setCreateProductName] = useState('');

    console.log("from createNameDiscount :", createNameDiscount);
    console.log("from createProductName :", createProductName);
    console.log("from createSpecialPrice :", createSpecialPrice);
    console.log("from createActiveDate :", createActiveDate);
    console.log("from createEndDate :", createEndDate);

    const onBtnCreateDiscount = async () => {
        try {
            if (!token) {
                return toast({
                    position: 'top',
                    title: "Create new discount",
                    description: 'unauthorized access',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            if (
                createNameDiscount == ''|| 
                (createSpecialPrice === '' && createSpecialPrice !== 0) || 
                createActiveDate == '' || 
                createEndDate == '' || 
                createProductName == ''){
                return toast({
                    position: 'top',
                    title: "Create new discount",
                    description: 'Please complete all required fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            let response = await axios.post(`${API_URL}/discount/discountmanual/`, {
                nameDiscount: createNameDiscount,
                specialPrice: createSpecialPrice,
                activeDate: createActiveDate,
                endDate: createEndDate,
                productId: createProductName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.data.success) {
                toast({
                    position: 'bottom',
                    title: "Create new discount",
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                handleCloseModal();
                getDiscountBranch();
            } else {
                return toast({
                    position: 'bottom',
                    title: "Create new discount",
                    description: response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    //////////--- GET PRODUCT ---//////////
    const [products, setProducts] = useState([]);
    const [selectedProductPrice, setSelectedProductPrice] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);

    console.log("This is Product Id that selected :", selectedProductId);
    console.log("This is Price from selected Product :", selectedProductPrice);

    const getProducts = async () => {
        try {
            let response = await axios.get(`${API_URL}/product/productlist?branch_id=${branch_id}&page&size=100&sortby&order&name&category&stock&branchname`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getProductPrice = (selectedProductId) => {
        const selectedProduct = products.find(product => product.stockBranches[0].product_id === parseInt(selectedProductId))
        if (selectedProduct) {
            console.log('Data from getProductPricd => selectedProduct:', selectedProduct);
            console.log('Data from getProductPricd => selectedProduct:', selectedProduct.price);
            return setSelectedProductPrice(selectedProduct.price);
        } else {
            console.log('Product not found');
            setSelectedProductPrice('');
        }
    }

    React.useEffect(() => {
        getProducts();
    }, [])

    React.useEffect(() => {
        getProductPrice(selectedProductId);
      }, [selectedProductId, products]);

    //////////--- DISCOUNT MANUAL DELETE ---//////////
    const onBtnDelete = async (id, isDeleted) => {
        console.log('Data id in onBtnDelete :', id);
        console.log('data isDeleted in onBtnDelete :', isDeleted);
        try {
            let response = await axios.patch(`${API_URL}/discount/discountmanualdelete/${id}`, {
                isDeleted: isDeleted
            }, {
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
            getDiscountBranch();
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

    //////////--- DISCOUNT MANUAL EDIT ---//////////
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit
    } = useDisclosure();
    const handleCloseModalEdit = () => {
        onCloseEdit();
        setCreateNameDiscount('');
        setCreateProductName('');
        setCreateSpecialPrice('');
        setCreateActiveDate('');
        setCreateEndDate('');
    }
    const [id, setId] = useState('');

    const onOpenEditBtn = (
        id,
        nameDiscount,
        specialPrice,
        activeDate,
        endDate,
        productId
    ) => {
        onOpenEdit();
        setId(id);
        setCreateNameDiscount(nameDiscount);
        setCreateSpecialPrice(specialPrice);
        setCreateActiveDate(activeDate);
        setCreateEndDate(endDate);
        setCreateProductName(productId);
    }

    const onBtnEdit = async () => {
        try {
            if (createNameDiscount == ''|| createSpecialPrice == '' || createActiveDate == '' || createEndDate == '' || createProductName == ''){
                return toast({
                    position: 'top',
                    title: "Create new discount",
                    description: 'Please complete all required fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            let response = await axios.patch(`${API_URL}/discount/discountmanualedit/${id}`, {
                nameDiscount: createNameDiscount,
                specialPrice: createSpecialPrice,
                activeDate: createActiveDate,
                endDate: createEndDate,
                productId: createProductName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("ini Data dari respone edit :", response);

            if(response.data.success) {
                toast({
                    position: 'top',
                    title: 'Edit discount',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                // onCloseEdit();
                handleCloseModalEdit();
                getDiscountBranch();
            } else {
                toast({
                    position: 'top',
                    title: 'Edit Discount',
                    description: response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    //////////--- CALCULATION PRECENTAGE DISCOUNT PRICE ---//////////
    const [pricePercent, setPricePercent] = useState('');

    const handlePercentChange = (e) => {
        // setPricePercent(e.target.value);
        let value = parseInt(e.target.value);

        if (isNaN(value) || value < 0) {
            value = 0; // Set the value to 0 if it is not a valid number or less than 0
          } else if (value > 100) {
            value = 100; // Set the value to 100 if it exceeds 100
          }
    
        setPricePercent(value);
      }

      const handleFinalPrice = () => {
        if (pricePercent) {
          const calculatedPrice = selectedProductPrice - (selectedProductPrice * pricePercent / 100);
          console.log("price after discount :", calculatedPrice);
          setCreateSpecialPrice(calculatedPrice.toFixed(0));
        } else {
          setCreateSpecialPrice(selectedProductPrice);
        }
      }


    React.useEffect(() => {
        handleFinalPrice();
      }, [pricePercent]);

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
            {/* --- MODAL ADD NEW DISCOUNT --- */}
            <Box 
                py={2} 
                display={'flex'} 
                px={{base:'2', sm:'2', md:'4'}}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Button 
                    onClick={onOpenDiscount}
                    backgroundColor="white" 
                    className='shadow-sm' 
                    size="sm" 
                    rounded="full" 
                    padding={2} 
                    gap={1} 
                    justifyItems="center"
                    fontSize={'md'}
                    letterSpacing={{base: 'tighter', sm:'tight', md:'normal'}}
                    >
                        <Box color='green.500' fontSize={'2xl'}>
                        <CiDiscount1/>
                        </Box>
                        Create new discount
                </Button>
                <Box>
                    <Input
                        h={'1.5rem'}
                        letterSpacing={{base: 'tighter', sm:'tight', md:'normal'}}
                        placeholder='Filter by Discount' 
                        size="sm" 
                        w={{base:'80%', sm: '90%', md: '100%', lg: '100%'}}
                        type={'search'} 
                        rounded={'lg'} 
                        backgroundColor={'white'}
                        onChange={(event) => setNameDiscount(event.target.value)}
                    />
                </Box>
                <Modal 
                initialFocusRef={initialRef} 
                finalFocusRef={finalRef} 
                isOpen={isOpenDiscount} 
                onClose={handleCloseModal}
                size={{base:'full', sm:'full', md:'2xl',lg:'2xl'}}
                >
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Create New Discount</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>
                                    Discount Name
                                </FormLabel>
                                <Input 
                                    type='text' 
                                    placeholder='Enter Discount name'
                                    onChange={(e) => setCreateNameDiscount(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                pt={'2'}
                            >
                                <FormLabel>
                                    Product Name
                                </FormLabel>
                                <Select 
                                    placeholder='Select Product'
                                    onChange={(e) => {
                                        setCreateProductName(e.target.value);
                                        setSelectedProductId(e.target.value);
                                        console.log('Selected product ID from select option:', e.target.value);
                                      }}
                                >
                                  {products.map((product) => (
                                    <option
                                        key={product.id}
                                        value={product.stockBranches[0].product_id}
                                    >
                                        {product?.name}
                                    </option>
                                  ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                pt={'2'}
                            >
                                <FormLabel>
                                        Special Price
                                </FormLabel>
                                <Flex
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Flex
                                        flexDir={'column'}
                                        w={'45%'}
                                    >
                                        <FormLabel>
                                          Price: {selectedProductPrice}
                                        </FormLabel>
                                        <Input 
                                            type='number'
                                            placeholder='Enter Percentage (1 - 100) %'
                                            letterSpacing={{base: 'tighter', sm:'tight', md:'normal'}}
                                            onChange={handlePercentChange}
                                            min={'0'}
                                            max={'100'}
                                        />
                                    </Flex>
                                    <Divider 
                                        orientation="vertical" 
                                        height="70px" 
                                        borderWidth="1px"
                                        borderColor="black"
                                    />
                                    <Flex
                                        flexDir={'column'}
                                        w={'45%'}
                                    >
                                        <FormLabel>
                                            Final Price
                                        </FormLabel>
                                        <Input 
                                            type='number'
                                            placeholder='Enter Nominal Price Here'
                                            letterSpacing={{base: 'tighter', sm:'tight', md:'normal'}}
                                            value={createSpecialPrice ? createSpecialPrice : pricePercent}
                                            onChange={(e) => setCreateSpecialPrice(e.target.value)}
                                        />
                                    </Flex>
                                </Flex>
                            </FormControl>
                            <FormControl
                                pt={'2'}
                            >
                                <FormLabel>
                                    Active Date
                                </FormLabel>
                                <Input 
                                    type='date' 
                                    placeholder='Enter Active Date'
                                    onChange={(e) => setCreateActiveDate(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                pt={'2'}
                            >
                                <FormLabel>
                                    End Date
                                </FormLabel>
                                <Input 
                                    type='date' 
                                    placeholder='Enter End Date'
                                    onChange={(e) => setCreateEndDate(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='green' 
                                mr={3}
                                onClick={onBtnCreateDiscount}
                            >
                                Create
                            </Button>
                            <Button 
                                colorScheme='red'
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
            </Box>
            {/* --- MODAL EDIT DISCOUNT --- */}
            <Modal 
                initialFocusRef={initialRef} 
                finalFocusRef={finalRef} 
                isOpen={isOpenEdit} 
                onClose={handleCloseModalEdit}
                size={{base:'full', sm:'full', md:'2xl',lg:'2xl'}}
                >
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Edit Discount</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>
                                    Discount Name
                                </FormLabel>
                                <Input 
                                    type='text' 
                                    placeholder='Enter Discount name'
                                    onChange={(e) => setCreateNameDiscount(e.target.value)}
                                    value={createNameDiscount}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    Product Name
                                </FormLabel>
                                <Select 
                                    placeholder='Select Product'
                                    onChange={(e) => setCreateProductName(e.target.value)}
                                    value={createProductName}
                                >
                                  {products.map((product) => (
                                    <option
                                        key={product.id}
                                        value={product.stockBranches[0].product_id}
                                    >
                                        {product?.name}
                                    </option>
                                  ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    Special Price
                                </FormLabel>
                                <Input 
                                    type='number'
                                    letterSpacing={{base: 'tighter', sm:'tight', md:'normal'}}
                                    placeholder='Enter Special Price'
                                    onChange={(e) => setCreateSpecialPrice(e.target.value)}
                                    value={createSpecialPrice}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    Active Date
                                </FormLabel>
                                <Input 
                                    type='date' 
                                    placeholder='Enter Active Date'
                                    onChange={(e) => setCreateActiveDate(e.target.value)}
                                    value={createActiveDate}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    End Date
                                </FormLabel>
                                <Input 
                                    type='date' 
                                    placeholder='Enter End Date'
                                    onChange={(e) => setCreateEndDate(e.target.value)}
                                    value={createEndDate}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='green' 
                                mr={3}
                                onClick={onBtnEdit}
                            >
                                Confirm
                            </Button>
                            <Button 
                                colorScheme='red'
                                // onClick={onCloseEdit}
                                onClick={handleCloseModalEdit}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
            {/* --- TABLE DISCOUNT MANUAL --- */}
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
                    <Table 
                        variant="simple"
                        size={'sm'}
                    >
                            <Thead px={'4'} >
                                <Tr
                                    display={{base: 'table-row', sm: 'table-row', md: 'none'}}
                                >
                                    <Th
                                        pl={'12'} 
                                        fontSize={{base:'sm', sm: 'sm'}}
                                        pb={'4'}
                                        onClick={() => handleSortDiscount('nameDiscount')}
                                    >
                                        <Flex 
                                            alignItems={'end'}
                                            justifyContent={'start'}
                                            gap={'0.5'}
                                        >
                                            Discount Name
                                            <Icon
                                                as={
                                                    discountSort === 'nameDiscount' && discountOrder === 'ASC' ?
                                                    IoIosArrowDropdown : IoIosArrowDropup
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                </Tr>
                                <Tr
                                    display={{base:'none', sm:'none', md: 'table-row'}}
                                >
                                    <Th
                                        textAlign={'center'}
                                    >
                                        No
                                    </Th>
                                    <Th
                                        textAlign={'center'}
                                        onClick={() => handleSortDiscount('nameDiscount')}
                                    >
                                        <Flex 
                                            alignItems={'center'}
                                            justifyContent={'start'}
                                        >
                                            Discount Name
                                            <Icon
                                                as={
                                                    discountSort === 'nameDiscount' && discountOrder === 'ASC' ?
                                                    IoIosArrowDropdown : IoIosArrowDropup
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                    <Th
                                        textAlign={'center'}
                                    >
                                        Special Price
                                    </Th>
                                    <Th
                                        textAlign={'center'}
                                    >
                                        Active Date
                                    </Th>
                                    <Th
                                        textAlign={'center'}
                                    >
                                        End Date
                                    </Th>
                                    <Th
                                        textAlign={'start'}
                                    >
                                        Product Name
                                    </Th>
                                    <Th
                                        textAlign={'end'}
                                    >
                                        <Flex
                                            justifyContent={'end'}
                                            pr={'3'}
                                        >
                                            Status
                                        </Flex>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {printDiscountBranch()}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex justifyContent={'center'} >
                        <Pagination
                            page = {discountPage}
                            size = {discountSize}
                            totalData = {dicountTotalData}
                            paginate = {discountPaginate}
                        />
                    </Flex>
                </Flex>
            </Box>
        </Box>
     );
}

export default DiscountManagement;