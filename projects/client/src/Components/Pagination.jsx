import React from 'react';
import {
    Flex,
    IconButton,
    Text
} from "@chakra-ui/react";
import { useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa';

function Pagination(props) {
    const [pageNumber, setPageNumber] = useState(1);
    // const pageNumbers = [];
    console.log("ini props.totaldata", props.totalData);
    console.log("ini props.limit", props.limit);
    // for (let i = 1; i <= Math.ceil(props.totalData / props.size); i++) {
    //     pageNumbers.push(i);
    // }

    // const buttonPrevious = () => {
    //     const maxPageNumber = Math.ceil(props.totalData / props.size);
    //     if (pageNumber < maxPageNumber) {
    //         setPageNumber(pageNumber + 1);
    //         props.paginate(pageNumber);
    //     }
    // }

    // const buttonNext = () => {
    //     if (pageNumber > 1) {
    //         setPageNumber(pageNumber - 1);
    //         props.paginate(pageNumber - 2);
    //     }
    // }

    const buttonNext = () => {
        const maxPageNumber = Math.ceil(props.totalData / props.size);
        if (pageNumber < maxPageNumber) {
          setPageNumber(pageNumber + 1);
          props.paginate(pageNumber);
        }
      }
      
      const buttonPrevious = () => {
        if (pageNumber > 1) {
          setPageNumber(pageNumber - 1);
          props.paginate(pageNumber - 2);
        }
      }

    return (
        // <Flex>
        //     {pageNumbers.map(number => (
        //         <Button onClick={() => props.paginate(number - 1)} color='white'
        //             size='sm'
        //             fontSize="xs"
        //             width="4"
        //             variant={props.page + 1 == number ? 'solid' : 'outline'}
        //             bg={props.page + 1 === number ? 'green.400' : 'green.600'}
        //             _hover={{
        //                 bg: "green.500",
        //             }}
        //             className='page-link' type="button"
        //             mr='2'
        //             _active={{
        //                 bg: 'green.600',
        //                 transform: 'scale(0.98)',
        //             }}
        //         >
        //             {number}
        //         </Button>
        //     ))}
        // </Flex>

        <Flex 
            justifyContent={'space-evenly'}
            alignItems={'center'}
            gap={'4'}
        >
            {/* BUTTON PERVIOUSE PAGE */}
            <IconButton 
                aria-label="Previous Page"
                onClick={buttonPrevious} 
                disabled={pageNumber === 1}
                icon={<FaChevronCircleLeft/>}
                color={'green.400'}
                size={'sm'}
                fontSize={'xl'}
                p={'2'}
                bg={'transparent'}
                mr='1'
                _active={{
                    transform: 'scale(0.98)',
                    bg: 'transparent',
                    color: 'green.700',
                }}
                _hover={{}}
            />
            {/* THE PAGE NUMBER*/}
            <Text
                background={'white'}
                // bgGradient='linear(to-b, green.500, green.400)'
                py={'0.5'}
                px={'3'}
                // color={'white'}
                rounded={'lg'}
                fontSize={'md'}
                border={'1px'}
                borderColor={'green.500'}
            >
                {pageNumber}
            </Text>
            {/* BUTTON NEXT PAGE */}
            <IconButton 
                aria-label="Next Page"
                onClick={buttonNext}
                disabled={pageNumber === Math.ceil(props.totalData / props.size)}
                icon={<FaChevronCircleRight/>}
                color={'green.400'}
                size={'sm'}
                fontSize={'xl'}
                p={'2'}
                bg={'transparent'}
                mr='1'
                _active={{
                    transform: 'scale(0.98)',
                    bg: 'transparent',
                    color: 'green.700',
                }}
                _hover={{}}
            />
        </Flex>
    )

}
export default Pagination;