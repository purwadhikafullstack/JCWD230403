import React from 'react';
import {
    Flex,
    Button,
} from "@chakra-ui/react";

function Pagination(props) {
    const pageNumbers = [];
    console.log("ini props.totaldata", props.totalData);
    console.log("ini props.limit", props.limit);
    for (let i = 1; i <= Math.ceil(props.totalData / props.size); i++) {
        pageNumbers.push(i);
    }
    return (
        <Flex>
            {pageNumbers.map(number => (
                <Button onClick={() => props.paginate(number - 1)} color='white'
                    size='sm'
                    fontSize="xs"
                    width="4"
                    variant={props.page + 1 == number ? 'solid' : 'outline'}
                    bg={props.page + 1 === number ? 'green.400' : 'green.600'}
                    _hover={{
                        bg: "green.500",
                    }}
                    className='page-link' type="button"
                    mr='2'
                    _active={{
                        bg: 'green.600',
                        transform: 'scale(0.98)',
                    }}
                >
                    {number}
                </Button>
            ))}
        </Flex>

    )

}
export default Pagination;