import React from 'react';
import { 
    Flex,
    Text,
    Icon,
    IconButton,
    Link,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stack
 } from '@chakra-ui/react';
import {
    FiHome,
} from 'react-icons/fi';
import {BsPersonVcard, BsFillBoxSeamFill} from 'react-icons/bs';
import {HiOutlinePresentationChartLine} from 'react-icons/hi';
import {BiTransfer, BiCategoryAlt} from 'react-icons/bi';
import {MdOutlineDiscount} from 'react-icons/md';
import {BsBoxArrowRight, BsFillArrowRightSquareFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sidebar() {
    const roleId = useSelector((state) => state.authAdminReducer.roleId);
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef();
    return ( 
      <Flex
        w={{base:'100%', sm:'100%', md:'10%', lg:'15%', xl:'15%'}}
        flexDir={'column'}
        alignItems={{base:'start', sm:'start', md:'center', lg:'center'}}
        bgGradient='linear(to-b, green.400, green.300)'
        px={{base:'0',sm:'5', md:'10', lg:'10'}}
        pt={{base:'1'}}
        pb={{base:'1'}}
      >
        <Flex
          flexDir={'column'}
          justifyContent={'space-between'}
          h={{base:null, sm: null, md:'100vh'}}
        >
         <Flex
          flexDir={'column'}
          as='nav'
         >
            <Flex 
              flexDir={{base:'row', sm:'row', md:'column', lg:'column'}} 
              alignItems={{base:'center', sm:'center', md:'center', lg:'flex-start'}} 
              justifyContent={'center'}
              gap={{base:'0.5'}}
            >
              <Flex 
                className='sidebar-items' 
                justifyContent={'center'}
              >
                <Link 
                  display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                >
                  <Icon 
                    display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                    as={FiHome} 
                    fontSize={'2xl'} 
                    className='active-icon' 
                    onClick={() => navigate('/admin')}
                  />
                </Link>
                <Link 
                  _hover={{textDecoration:'none'}} 
                  display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                >
                  <Text 
                    className='active' 
                    onClick={() => navigate('/admin')}
                  >
                    Home
                  </Text>
                </Link>
              </Flex>
              {/* --- ADMIN --- */}
              {
                roleId === 1 ?
                  <Flex 
                    className='sidebar-items' 
                    justifyContent={'center'}
                  >
                    <Link 
                      display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                    >
                      <Icon 
                        display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                        as={BsPersonVcard} 
                        fontSize={'2xl'} 
                        className='active-icon' 
                        onClick={() => navigate('/usermanagement')}
                      />
                    </Link>
                    <Link 
                      _hover={{textDecoration:'none'}} 
                      display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                    >
                      <Text 
                        className='active' onClick={() => navigate('/usermanagement')}
                      >
                        Employee
                      </Text>
                    </Link>
                  </Flex>
                  : null
              }
              {/* --- BRANCH ADMIN --- */}
              {
                roleId === 2 ?
                <>
                  <Flex 
                    className='sidebar-items' 
                    justifyContent={'center'}
                  >
                    <Link 
                      display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                    >
                      <Icon 
                        display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                        as={BiCategoryAlt} 
                        fontSize={'2xl'} 
                        className='active-icon' 
                        onClick={() => navigate('/categorymanagement')}
                      />
                    </Link>
                    <Link 
                      _hover={{textDecoration:'none'}} 
                      display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                    >
                      <Text 
                        className='active' 
                        onClick={() => navigate('/categorymanagement')} 
                      >
                        Category
                      </Text>
                    </Link>
                  </Flex>
                  <Flex 
                    className='sidebar-items' justifyContent={'center'}
                  >
                    <Link 
                      display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                    >
                      <Icon 
                        display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                        as={BsFillBoxSeamFill} 
                        fontSize={'2xl'} 
                        className='active-icon' 
                        onClick={() => navigate('/productmanagement')}
                      />
                    </Link>
                    <Link 
                      _hover={{textDecoration:'none'}} 
                      display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                    >
                      <Text 
                        className='active' 
                        onClick={() => navigate('/productmanagement')} 
                      >
                        Product
                      </Text>
                    </Link>
                  </Flex>
                  <Flex 
                    className='sidebar-items' 
                    justifyContent={'center'}
                  >
                    <Link 
                      display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                    >
                      <Icon 
                        display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                        as={MdOutlineDiscount} 
                        fontSize={'2xl'} 
                        className='active-icon' 
                        onClick={() => navigate('/discountmanagement')}
                      />
                    </Link>
                    <Link 
                      _hover={{textDecoration:'none'}} 
                      display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                    >
                      <Text 
                        className='active' 
                        onClick={() => navigate('/discountmanagement')} 
                      >
                        Discount
                      </Text>
                    </Link>
                  </Flex>
                  <Flex 
                    className='sidebar-items' 
                    justifyContent={'center'}
                  >
                    <Link 
                      display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                    >
                      <Icon 
                        display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                        as={BiTransfer} 
                        fontSize={'2xl'} 
                        className='active-icon' 
                        onClick={() => navigate('/transaction')}
                      />
                    </Link>
                    <Link 
                      _hover={{textDecoration:'none'}} 
                      display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                    >
                      <Text 
                        className='active' 
                        onClick={() => navigate('/transaction')} 
                      >
                        Transaction
                      </Text>
                    </Link>
                  </Flex>
                </> : null
              }
              <Flex 
                className='sidebar-items' 
                justifyContent={'center'}
              >
                <Link 
                  display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}
                >
                  <Icon 
                    display={{base:'none', sm:'none', md:'flex', lg:'flex'}} 
                    as={HiOutlinePresentationChartLine} 
                    fontSize={'2xl'} 
                    className='active-icon' 
                    onClick={() => navigate('/report')}
                  />
                </Link>
                <Link 
                  _hover={{textDecoration:'none'}} 
                  display={{base:'none', sm:'none', md:'none', lg:'flex'}}
                >
                  <Text 
                    className='active' 
                    onClick={() => navigate('/report')} 
                  >
                    Report
                  </Text>
                </Link>
              </Flex>
              <IconButton 
                size={'sm'} 
                color={'green.400'}
                as={BsBoxArrowRight}
                m={'0.5'}
                ml={'1'}
                bgColor={'white'}
                p={'1'}
                ref={btnRef}
                onClick={onOpen}
                display={{base:'flex', sm: 'flex', md: 'none', lg: 'none'}}
              />
              <Drawer
                isOpen={isOpen}
                placement='left'
                initialFocusRef={btnRef}
                onClose={onClose}
                size={{base:'full', sm: 'xs'}}
              >
                <DrawerOverlay />
                <DrawerContent
                  bgColor={'green.400'}
                >
                  <DrawerCloseButton />
                  <DrawerHeader 
                    borderBottomWidth='1px'
                    color={'white'}
                  >
                    Main Menu
                  </DrawerHeader>
                  <DrawerBody>
                    <Stack
                      spacing={'6'}
                      pt={'4'}
                    >

                      <Text 
                        className='active' 
                        onClick={() => {
                          navigate('/admin');
                          onClose();
                        }}
                        color={'white'}
                      >
                        <Flex 
                          alignItems={'center'}
                          gap={'3'}
                        >
                          <Icon 
                            as={FiHome} 
                            fontSize={'2xl'} 
                            className='active-icon' 
                            onClick={() => {
                              navigate('/admin');
                              onClose();
                            }}
                          />
                          Home
                        </Flex>
                      </Text>
                      {/* --- ADMIN --- */}
                      {
                        roleId === 1 ?
                          <Text 
                            className='active' 
                            onClick={() => {
                              navigate('/usermanagement');
                              onClose();
                            }}
                            color={'white'}
                          >
                            <Flex
                              alignItems={'center'}
                              gap={'3'}
                            >
                              <Icon 
                                as={BsPersonVcard} 
                                fontSize={'2xl'} 
                                className='active-icon' 
                                onClick={() => {
                                  navigate('/usermanagement');
                                  onClose();
                                }}
                              />
                              Employee
                            </Flex>
                          </Text>
                          : null
                      }
                      {/* --- BRANCH ADMIN --- */}
                      {
                        roleId === 2 ?
                        <>
                          <Text 
                            className='active' 
                            onClick={() => {
                              navigate('/categorymanagement');
                              onClose();
                            }}
                            color={'white'}
                          >
                            <Flex
                              alignItems={'center'}
                              gap={'3'}
                            >
                              <Icon
                                as={BiCategoryAlt} 
                                fontSize={'2xl'} 
                                className='active-icon' 
                                onClick={() => {
                                  navigate('/categorymanagement');
                                  onClose();
                                }}
                              />
                              Category
                            </Flex>
                          </Text>
                          <Text 
                            className='active' 
                            onClick={() => {
                              navigate('/productmanagement');
                              onClose();
                            }}
                            color={'white'}
                          >
                            <Flex
                              alignItems={'center'}
                              gap={'3'}
                            >
                              <Icon 
                                as={BsFillBoxSeamFill} 
                                fontSize={'2xl'} 
                                className='active-icon' 
                                onClick={() => {
                                  navigate('/productmanagement');
                                  onClose();
                                }}
                              />
                              Product
                            </Flex>
                          </Text>
                          <Text 
                            className='active' 
                            onClick={() => {
                              navigate('/discountmanagement');
                              onClose();
                            }}
                            color={'white'}
                          >
                            <Flex
                              alignItems={'center'}
                              gap={'3'}
                            >
                              <Icon 
                                as={MdOutlineDiscount} 
                                fontSize={'2xl'} 
                                className='active-icon' 
                                onClick={() => {
                                  navigate('/discountmanagement');
                                  onClose();
                                }}
                              />
                              Discount
                            </Flex>
                          </Text>
                          <Text 
                            className='active' 
                            onClick={() => {
                              navigate('/transaction');
                              onClose();
                            }}
                            color={'white'}
                          >
                            <Flex
                              alignItems={'center'}
                              gap={'3'}
                            >
                              <Icon 
                                as={BiTransfer} 
                                fontSize={'2xl'} 
                                className='active-icon' 
                                onClick={() => {
                                  navigate('/transaction');
                                  onClose();
                                }}
                              />
                              Transaction
                            </Flex>
                          </Text>
                        </> : null
                      }
                      <Text 
                        className='active' 
                        onClick={() => {
                          navigate('/report');
                          onClose();
                        }}
                        color={'white'}
                      >
                        <Flex
                          alignItems={'center'}
                          gap={'3'}
                        >
                          <Icon 
                            as={HiOutlinePresentationChartLine} 
                            fontSize={'2xl'} 
                            className='active-icon' 
                            onClick={() => {
                              navigate('/report');
                              onClose();
                            }}
                          />
                          Report
                        </Flex>
                      </Text>
                    </Stack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Flex>
          </Flex> 
        </Flex>
      </Flex>
     );
}

export default Sidebar;