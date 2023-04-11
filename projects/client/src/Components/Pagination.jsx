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
                    size='md'
                    fontSize="xs"
                    width="4"
                    variant={props.page + 1 == number ? 'solid' : 'outline'}
                    bg={'orange.400'}
                    colorScheme='orange'
                    _hover={{
                        bg: "orange",
                    }}
                    className='page-link' type="button"
                    mr='4'
                    _active={{
                        bg: 'orange.600',
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