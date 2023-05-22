import {
    Box,
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    Text,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalContent,
    FormLabel,
    ModalOverlay,
    FormControl,
    useDisclosure,
    ModalCloseButton,
    Input,
    VStack, 
    useToast

} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

function TransactionDetail() {
    let token = localStorage.getItem('grocery_login')

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalPayment = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const inputFile = React.useRef(null);

    const navigate = useNavigate()

    const toTransactionList = () => {
        navigate('/list')
    }

    const onChangeFile = (val) => {
        setFile(val.target.files[0]);
    };

    const [file, setFile] = useState({});
    const [order, setOrder]= useState("")

    const btnConfirmPayment = async () => {
        try {
            if (file != null) {
                let formData = new FormData();

                formData.append(
                    "data",
                    JSON.stringify({
                        paymentProof: file,
                        status: 'Waiting for confirmation payment'
                    })
                );

                formData.append("image", file);

                const response = await axios.patch(`http://localhost:8000/api/transaction/payment`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setFile(null);
                    onClose();
                }
            } else {
                toast({
                    title: "Failed to Upload Image",
                    description: `Please Ensure that an image is chosen`,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [status, setStatus] = useState(0)

    // const getOrders = async () => {
    //     try {
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getOrders = async () => {
    //     try {
    //       if (status === 0) {
    //         const res = await axios.get(
    //           `${API_URL}/order/customer-order?order=${orderBy}&page=${page}&size=${size}`,
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );
    
    //         setLoading(false);
    //         setOrderList(res.data.data);
    //         setTotalData(res.data.datanum);
    //       } else {
    //         const res = await axios.get(
    //           `${API_URL}/order/customer-order?status=${status}&order=${orderBy}&page=${page}&size=${size}`,
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );
    
    //         console.log("aaaaaaaaaaaaa", res.data);
    //         setLoading(false);
    //         setOrderList(res.data.data);
    //         setTotalData(res.data.datanum);
    //       }
    //     } catch (error) {
    //       console.log("error getOrders", error);
    //     }
    //   };
    
    //   const printOrders = () => {
    //     if (orderList.length === 0) {
    //       return (
    //         <Flex
    //           color={"white"}
    //           maxW={"100vw"}
    //           mx={"auto"}
    //           flexDir={"column"}
    //           alignItems={"center"}
    //           justifyContent={"center"}
    //           gap={7}
    //         >
    //           <Text as={"h1"} fontWeight={"semibold"} fontSize={"3xl"}>
    //             No Orders Found
    //           </Text>
    //         </Flex>
    //       );
    //     } else {
    //       return orderList.map((val, idx) => {
    //         return (
    //           <>
    //             <Box w={"full"} boxShadow={"dark-lg"} mb={"6"} rounded={"lg"}>
    //               {/*===================================================================== TOP section ===========================================================================*/}
    //               <Flex w={"full"} flexDirection={"column"} px="3" pt="3">
    //                 <Flex gap="3" alignItems={"center"} mb="4">
    //                   <Text fontSize={{ base: "xs", lg: "xs" }}>
    //                     {dateFormat(val.createdAt).split(",")[0]}
    //                   </Text>
    //                   <Flex
    //                     backgroundColor={
    //                       val.status === 13
    //                         ? "rgba(52,211,153,0.1)"
    //                         : val.status === 14
    //                         ? "rgba(255,0,0,0.3)"
    //                         : "rgba(240,220,91,0.5)"
    //                     }
    //                     rounded={"md"}
    //                     px={"5px"}
    //                   >
    //                     <Text
    //                       color={val.status === 13 ? "#34D399" : "black"}
    //                       textAlign={"center"}
    //                       fontWeight={"semibold"}
    //                       fontSize={{ base: "xs", lg: "xs" }}
    //                       letterSpacing={"normal"}
    //                       mb="1px"
    //                     >
    //                       {val.status.status}
    //                     </Text>
    //                   </Flex>
    //                   <Text
    //                     display={{ base: "none", md: "block" }}
    //                     color={"gray.400"}
    //                     textAlign={"center"}
    //                     fontWeight={"semibold"}
    //                     fontSize={{ base: "xs", lg: "sm" }}
    //                     letterSpacing={"wider"}
    //                     mb="1px"
    //                   >
    //                     {shorten(val.uuid)}
    //                   </Text>
    //                 </Flex>
    //                 {/*===================================================================== MIddle section ===========================================================================*/}
    //                 <Flex
    //                   w="full"
    //                   borderTop={"1px"}
    //                   borderTopColor={"gray.500"}
    //                   borderBottom={"1px"}
    //                   borderBottomColor={"gray.500"}
    //                   mb="4"
    //                 >
    //                   <Flex
    //                     h={"full"}
    //                     w={{ base: "50%", md: "35%" }}
    //                     justifyContent={"center"}
    //                   >
    //                     <Image
    //                       objectFit={"contain"}
    //                       height={{
    //                         base: "150px",
    //                         md: "200px",
    //                       }}
    //                       w={"full"}
    //                       rounded={"xl"}
    //                       alt="product picture"
    //                       src={`${API_URL}${val.orderdetails[0].type.product.productImage}`}
    //                     />
    //                   </Flex>
    //                   <Flex
    //                     w={{ base: "50%", md: "40%" }}
    //                     color={"whiteAlpha.900"}
    //                     wrap={"wrap"}
    //                     p={2}
    //                     alignItems={"center"}
    //                   >
    //                     <Text
    //                       as="h1"
    //                       textAlign={{ base: "left", md: "center" }}
    //                       fontSize={{ base: "md", md: "xl" }}
    //                       letterSpacing={"wider"}
    //                       fontWeight={"hairline"}
    //                     >
    //                       {val.orderdetails[0].type.product.name}
    //                     </Text>
    //                     <Text
    //                       as="p"
    //                       w={"full"}
    //                       textAlign={{ base: "left", md: "center" }}
    //                       my={{ base: "2", md: "2.5", lg: "1" }}
    //                       letterSpacing={"wider"}
    //                       fontSize={{ base: "xs", md: "sm", lg: "md" }}
    //                       display="flex"
    //                       alignItems="center"
    //                     >
    //                       <span
    //                         style={{
    //                           borderRight: "1px solid #01a35e",
    //                           paddingRight: "0.5rem",
    //                           marginRight: "0.5rem",
    //                         }}
    //                       >
    //                         {val.orderdetails[0].type.color.color}
    //                       </span>
    //                       {val.orderdetails[0].type.memory.memory} GB
    //                     </Text>
    //                     <Text
    //                       w={"full"}
    //                       textAlign={{ base: "left", md: "left" }}
    //                       fontSize={{ base: "xs", md: "sm", lg: "sm" }}
    //                       color={"gray.300"}
    //                       letterSpacing={"wider"}
    //                       fontWeight={"hairline"}
    //                     >
    //                       {val.orderdetails[0].totalQty} Pcs
    //                     </Text>
    //                     <Text
    //                       as="p"
    //                       w={"full"}
    //                       textAlign={{ base: "left" }}
    //                       fontSize={{ base: "sm", md: "lg", lg: "xl" }}
    //                       letterSpacing={"wider"}
    //                     >
    //                       {formating(val.orderdetails[0].priceOnDate)}
    //                     </Text>
    
    //                     {val.orderdetails.length > 1 ? (
    //                       <Text
    //                         display={{ base: "none", md: "block" }}
    //                         textAlign={"left"}
    //                         color={"gray.400"}
    //                         fontSize={{ md: "md" }}
    //                       >
    //                         +{val.orderdetails.length - 1} other products
    //                       </Text>
    //                     ) : null}
    //                   </Flex>
    //                   <Flex
    //                     flexDir={"column"}
    //                     display={{ base: "none", md: "flex" }}
    //                     w={{ md: "25%" }}
    //                     justifyContent={"space-evenly"}
    //                   >
    //                     <Text
    //                       as={"span"}
    //                       textAlign={"center"}
    //                       color={"white"}
    //                       letterSpacing={"wider"}
    //                       fontSize={{ base: "xs", md: "md", lg: "xl" }}
    //                       fontWeight={"semibold"}
    //                     >
    //                       Total Price
    //                     </Text>
    //                     <Text
    //                       as={"span"}
    //                       textAlign={"center"}
    //                       color={"#1BFD9C"}
    //                       letterSpacing={"wider"}
    //                       fontSize={{ base: "xs", md: "md", lg: "xl" }}
    //                       fontWeight={"semibold"}
    //                     >
    //                       {formating(val.finalPrice)}
    //                     </Text>
    //                   </Flex>
    //                 </Flex>
    //                 {val.orderdetails.length > 1 ? (
    //                   <Flex
    //                     justifyContent={"space-between"}
    //                     display={{ base: "flex", md: "none" }}
    //                   >
    //                     <Text
    //                       display={{ md: "none" }}
    //                       mb="4"
    //                       textAlign={"left"}
    //                       fontSize={{ base: "sm", md: "md" }}
    //                     >
    //                       +{val.orderdetails.length - 1} other products
    //                     </Text>
    //                     <Text
    //                       display={{ md: "none" }}
    //                       as="u"
    //                       mb="4"
    //                       textAlign={"left"}
    //                       fontSize={{ base: "sm", md: "md" }}
    //                       color={"#1AC17A"}
    //                       cursor={"pointer"}
    //                       onClick={() => {
    //                         getOneOrder(val.uuid);
    //                       }}
    //                     >
    //                       View Details
    //                     </Text>
    //                   </Flex>
    //                 ) : (
    //                   <Flex
    //                     justifyContent={"space-between"}
    //                     display={{ base: "flex", md: "none" }}
    //                   >
    //                     <Text
    //                       color={"#17171A"}
    //                       mb="4"
    //                       textAlign={"left"}
    //                       fontSize={{ base: "sm", md: "md" }}
    //                     >
    //                       -
    //                     </Text>
    //                     <Text
    //                       display={{ md: "none" }}
    //                       as="u"
    //                       mb="4"
    //                       textAlign={"left"}
    //                       fontSize={{ base: "sm", md: "md" }}
    //                       color={"#1AC17A"}
    //                       cursor={"pointer"}
    //                       onClick={() => {
    //                         getOneOrder(val.uuid);
    //                       }}
    //                     >
    //                       View Details
    //                     </Text>
    //                   </Flex>
    //                 )}
    //               </Flex>
    
    //               {/*===================================================================== Bottom section ===========================================================================*/}
    
    //               {/*===================================================================== below MD ===========================================================================*/}
    //               <Flex
    //                 px={3}
    //                 pb={4}
    //                 alignItems={"center"}
    //                 justifyContent={"center"}
    //                 display={{ md: "none" }}
    //               >
    //                 <Flex
    //                   w="full"
    //                   justifyContent={"space-between"}
    //                   alignItems={"center"}
    //                 >
    //                   <Flex flexDir={"column"}>
    //                     <Text
    //                       as={"span"}
    //                       textAlign={"center"}
    //                       color={"white"}
    //                       letterSpacing={"wider"}
    //                       fontSize={{ base: "xs", md: "md", lg: "xl" }}
    //                       fontWeight={"semibold"}
    //                     >
    //                       Total Price
    //                     </Text>
    //                     <Text
    //                       as={"span"}
    //                       textAlign={"center"}
    //                       color={"#1BFD9C"}
    //                       letterSpacing={"wider"}
    //                       fontSize={{ base: "xs", md: "md", lg: "xl" }}
    //                       fontWeight={"semibold"}
    //                     >
    //                       {formating(val.finalPrice)}
    //                     </Text>
    //                   </Flex>
    //                   {val.statusId === 9 ? (
    //                     <Button
    //                       onClick={() => {
    //                         modalPayment.onOpen();
    //                         setOrder(val.uuid);
    //                       }}
    //                       letterSpacing={"normal"}
    //                       size={"sm"}
    //                       variant={"solid"}
    //                       backgroundColor={"#019d5a"}
    //                       color={"black"}
    //                       _hover={{
    //                         scale: "105",
    //                         bgColor: "#34D399",
    //                       }}
    //                     >
    //                       Confirm Payment
    //                     </Button>
    //                   ) : null}
    //                 </Flex>
    //               </Flex>
    //               {/*===================================================================== below MD ===========================================================================*/}
    
    //               <Box
    //                 p={4}
    //                 alignItems={"center"}
    //                 justifyContent={"center"}
    //                 display={{ base: "none", md: "flex" }}
    //               >
    //                 <Flex w={"90%"} justifyContent={"space-between"}>
    //                   <Text
    //                     as="u"
    //                     mb="4"
    //                     fontSize={{ md: "md", lg: "xl" }}
    //                     color={"#1AC17A"}
    //                     cursor={"pointer"}
    //                     onClick={() => {
    //                       getOneOrder(val.uuid);
    //                     }}
    //                   >
    //                     View Details
    //                   </Text>
    //                   {val.statusId === 9 ? (
    //                     <Button
    //                       onClick={() => {
    //                         modalPayment.onOpen();
    //                         setOrder(val.uuid);
    //                       }}
    //                       letterSpacing={"normal"}
    //                       size={"sm"}
    //                       variant={"solid"}
    //                       backgroundColor={"#019d5a"}
    //                       color={"black"}
    //                       _hover={{
    //                         color: "white",
    //                         scale: "105",
    //                         bgColor: "#34D399",
    //                       }}
    //                     >
    //                       Confirm Payment
    //                     </Button>
    //                   ) : null}
    //                 </Flex>
    //               </Box>
    //             </Box>
    //           </>
    //         );
    //       });
    //     }
    //   };

    return (
        <>
            <Box
                height={'2xl'}
                w={'50%'}
                mx={'auto'}
                mt={'120'}
            >
                <Card
                    align='center'
                >
                    <CardHeader>
                        <Heading size='md'> Thank you for shopping with us</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Please confirm your payment</Text>
                    </CardBody>
                    <CardFooter>
                        <VStack>
                            <Button
                                // colorScheme='blue'
                                bgColor={'#6FA66F'}
                                _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                // size="lg"
                                fontSize="lg"
                                // rightIcon={<FaArrowRight />}
                                color={'white'}
                                rounded={'none'}
                                variant={"solid"}
                                onClick={onOpen}
                                mb={'2'}

                            >
                                Pay now
                            </Button>
                            <Button
                                borderColor={'#6FA66F'}
                                mr={'4'}
                                onClick={toTransactionList}
                                color={'#6FA66F'}
                                variant={'link'}
                            // _hover={{tra}}
                            >
                                View order list
                            </Button>
                        </VStack>

                    </CardFooter>
                </Card>
                {/* <Button onClick={onOpen}>Open Modal</Button> */}

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Upload your payment proof</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <input
                                    type={'file'}
                                    id={'file'}
                                    ref={inputFile}
                                    onChange={onChangeFile}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            {file != null ? (
                                <Button
                                    mr={3}
                                    bgColor={'#6FA66F'}
                                    _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                    // size="lg"
                                    fontSize="lg"
                                    // rightIcon={<FaArrowRight />}
                                    color={'white'}
                                    rounded={'none'}
                                    variant={"solid"}
                                    onClick={btnConfirmPayment}
                                >
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    mr={3}
                                    bgColor={'#6FA66F'}
                                    _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                                    // size="lg"
                                    fontSize="lg"
                                    // rightIcon={<FaArrowRight />}
                                    color={'white'}
                                    rounded={'none'}
                                    variant={"solid"}
                                    onClick={btnConfirmPayment}
                                    isDisabled={true}
                                >
                                    Save
                                </Button>
                            )}
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
}

export default TransactionDetail;