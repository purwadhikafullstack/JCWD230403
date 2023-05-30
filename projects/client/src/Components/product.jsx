import React, { useState } from 'react';
import { 
    Card, 
    CardBody, 
    Image, 
    Stack, 
    Heading,
    Flex,
    Text,
    Icon,
    Box,
    Divider,
    CardFooter,
    Button
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { CiDiscount1 } from 'react-icons/ci';

function Products({name, productimage, price, productId, stock, specialPrice}) {
    const navigate = useNavigate();

  return (

    <Card 
        cursor="pointer" 
        maxW={'3xl'} 
        variant={'outline'} 
        minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} 
        bgColor='white' 
        borderRadius={{ base: 'lg', sm: 'lg', md: 'lg', lg: 'lg' }} 
        onClick={() => navigate(`/detail/${productId}`)}
    >
            <Image 
            src={productimage && (productimage.includes('http') || productimage.includes('https')) ? productimage : `${process.env.REACT_APP_API_IMG_URL}${productimage}`}
            alt='Category picture'
            borderTopRadius={{ base: 'lg', sm: 'lg', md: 'lg', lg: 'lg' }}
            objectFit='cover'
            w='full'
            maxH={200}
            />
            <CardBody>
                <Stack 
                    mt={{ base: '-1', sm: '-1', md:'-1', lg: '-1' }}
                >
                    <Heading 
                        size={{ base: 'sm', sm: 'md' }} 
                        fontSize={'lg'} 
                        fontWeight={'semibold'}
                    >
                        {
                            specialPrice ? (
                                <Flex
                                    justifyContent='start'
                                    alignItems={'baseline'}
                                    gap={'1'}
                                    mx={'0.5'}
                                >
                                    <Text
                                        fontSize={'lg'}
                                    >
                                        {name}
                                    </Text>
                                    <Box
                                        mt={-1}
                                    >
                                        <Icon as={CiDiscount1} color={'orange.300'} />
                                    </Box>
                                </Flex>
                            ) : (
                                <Flex
                                    justifyContent='start'
                                    mx={'0.5'}
                                >
                                    <Text
                                        fontSize={'lg'}
                                    >
                                        {name}
                                    </Text>
                                </Flex>
                            )
                        }
                    </Heading>
                </Stack>
                <Stack 
                    mt={{ base: '1', sm: '1' }}
                >
                    <Heading 
                        size={{ base: 'sm', sm: 'md' }} 
                        fontSize={'lg'} 
                        fontWeight={'semibold'}
                    >
                        {
                          specialPrice ? (
                            <Flex
                                mx={'1'}
                                gap={'2'}
                                alignItems={'baseline'}
                            >
                                <Text 
                                    as='s' 
                                    color={'gray.500'}
                                    fontSize={'sm'}
                                > 
                                    Rp. {price} 
                                </Text>
                                <Text
                                    color='green.500'
                                    fontSize={'lg'}
                                    fontWeight={'semibold'}
                                >
                                    Rp. {specialPrice}
                                </Text>
                            </Flex>
                          ) : (
                            <Flex
                              justifyContent='start'
                              mx={'0.5'}
                            >
                              <Text
                                fontSize={'lg'}
                              >
                                Rp. {price}
                              </Text>
                            </Flex>
                          )
                        }
                    </Heading>
                </Stack>
            </CardBody>
            <Divider mt={'-2'} mb={'-2'}/>
            <CardFooter>
                <Box
                    marginLeft="auto"
                    mb={'-2'}
                >
                    <Button
                        onClick={() => navigate(`/detail/${productId}`)}
                        ml={'auto'}
                        variant={'outline'}
                        colorScheme='green'
                        size={'sm'}
                    >
                        Detail
                    </Button>
                </Box>
            </CardFooter>
        </Card>

  )

};

export default Products;