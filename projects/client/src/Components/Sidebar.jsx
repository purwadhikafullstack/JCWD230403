import React from 'react';
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
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement
 } from '@chakra-ui/react';
import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiCreditCard,
    FiSearch,
    FiBell
} from 'react-icons/fi';
import {BsPersonVcard, BsFillBoxSeamFill} from 'react-icons/bs';
import {HiOutlinePresentationChartLine} from 'react-icons/hi';
import {BiTransfer, BiCategoryAlt} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    return ( 
        <Flex
        w={{base:'100%', sm:'100%', md:'10%', lg:'15%', xl:'15%'}}
        flexDir={'column'}
        alignItems={'center'}
        bgGradient='linear(to-b, green.400, green.300)'
        px={'10'}
        pt={{base:'7'}}
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
              gap={{base:'1'}}
            >
              <Flex className='sidebar-items' justifyContent={'center'}>
                <Link display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                  <Icon display={{base:'none', sm:'none', md:'flex', lg:'flex'}} as={FiHome} fontSize={'2xl'} className='active-icon' onClick={() => navigate('/admin')}/>
                </Link>
                <Link _hover={{textDecoration:'none'}} display={{base:'flex', sm:'flex', md:'none', lg:'flex'}}>
                  <Text className='active' onClick={() => navigate('/admin')}>Home</Text>
                </Link>
              </Flex>
              <Flex className='sidebar-items' justifyContent={'center'}>
                <Link display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                  <Icon display={{base:'none', sm:'none', md:'flex', lg:'flex'}} as={BsPersonVcard} fontSize={'2xl'} className='active-icon' onClick={() => navigate('/usermanagement')}/>
                </Link>
                <Link _hover={{textDecoration:'none'}} display={{base:'flex', sm:'flex', md:'none', lg:'flex'}}>
                  <Text className='active' onClick={() => navigate('/usermanagement')}>Employee</Text>
                </Link>
              </Flex>
              <Flex className='sidebar-items' justifyContent={'center'}>
                <Link display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                  <Icon display={{base:'none', sm:'none', md:'flex', lg:'flex'}} as={BiCategoryAlt} fontSize={'2xl'} className='active-icon' onClick={() => navigate('/categorymanagement')}/>
                </Link>
                <Link _hover={{textDecoration:'none'}} display={{base:'flex', sm:'flex', md:'none', lg:'flex'}}>
                  <Text className='active' onClick={() => navigate('/categorymanagement')} >Category</Text>
                </Link>
              </Flex>
              <Flex className='sidebar-items' justifyContent={'center'}>
                <Link display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                  <Icon display={{base:'none', sm:'none', md:'flex', lg:'flex'}} as={BsFillBoxSeamFill} fontSize={'2xl'} className='active-icon' onClick={() => navigate('/productmanagement')}/>
                </Link>
                <Link _hover={{textDecoration:'none'}} display={{base:'flex', sm:'flex', md:'none', lg:'flex'}}>
                  <Text className='active' onClick={() => navigate('/productmanagement')} >Product</Text>
                </Link>
              </Flex>
              <Flex className='sidebar-items' justifyContent={'center'}>
                <Link display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                  <Icon display={{base:'none', sm:'none', md:'flex', lg:'flex'}} as={BiTransfer} fontSize={'2xl'} className='active-icon' onClick={() => navigate('/transaction')}/>
                </Link>
                <Link _hover={{textDecoration:'none'}} display={{base:'flex', sm:'flex', md:'none', lg:'flex'}}>
                  <Text className='active' onClick={() => navigate('/transaction')} >Transaction</Text>
                </Link>
              </Flex>
              <Flex className='sidebar-items' justifyContent={'center'}>
                <Link display={{base:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                  <Icon display={{base:'none', sm:'none', md:'flex', lg:'flex'}} as={HiOutlinePresentationChartLine} fontSize={'2xl'} className='active-icon' onClick={() => navigate('/report')}/>
                </Link>
                <Link _hover={{textDecoration:'none'}} display={{base:'flex', sm:'flex', md:'none', lg:'flex'}}>
                  <Text className='active' onClick={() => navigate('/report')} >Report</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex> 
          <Flex>
          </Flex>
        </Flex>
      </Flex>
     );
}

export default Sidebar;