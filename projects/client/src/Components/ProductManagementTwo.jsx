import React, { useRef, useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Switch,
    Tbody,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast,
    Box,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { HiDocumentAdd } from "react-icons/hi";
import { FaRegEdit } from 'react-icons/fa';
import { API_URL } from "../helper";

function ProductManagementTwo(props) {
    const modalDelete = useDisclosure();
    const modalEdit = useDisclosure();
    const modalProduct = useDisclosure();
    const cancelRef = React.useRef();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [product, setProduct] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const toast = useToast();
    const [stock, setStock] = useState("");

    const inputFile = useRef(null);
    const [fileProduct, setFileProduct] = useState(null);

    const onChangeFile = (event) => {
        modalProduct.onOpen();
        setFileProduct(event.target.files[0]);
    };

    console.log("props image", props.image);

    const printSelectOption = () => {
        console.log(props.dataAllCategory);
        return props.dataAllCategory.map((val, idx) => {
            return <option style={{ backgroundColor: "white", color: "black" }} value={val.id}>{val.category}</option>;
        });
    };

    const btnEdit = async (uuid) => {
        try {
            const newStock = stock ? stock : props.stock;

            let token = localStorage.getItem('grocery_login');
            let formData = new FormData();

            formData.append(
                "data",
                JSON.stringify({
                    name: !name ? props.name : name,
                    price: !price ? props.price : price,
                    description: !description ? props.description : description,
                    category: !category
                        ? parseInt(props.categoryId)
                        : parseInt(category),
                    stock: !stock ? props.stock : stock,
                    before: props.stock,
                    after: newStock,
                })
            );
            if (fileProduct != null) {
                formData.append("images", fileProduct);
            }
            let update = await axios.patch(`http://localhost:8000/api/product/editproducts/${props.uuid}`, formData, {

                headers:
                {
                    Authorization: `Bearer ${token}`
                }

            });
            if (update.data.success) {
                setFileProduct(null);
                toast({
                    position: "top",
                    title: `Edit Success`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                props.getDataProduct();
                modalEdit.onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const btnDelete = async (uuid) => {
        try {
            let token = localStorage.getItem('grocery_login');

            let deleteProduct = await axios.delete(`http://localhost:8000/api/product/deleteproducts/${props.uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            console.log(`res delete product`, deleteProduct);
            props.getDataProduct();
            modalDelete.onClose();

        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Tbody>
            <Tr>
                <Td>{props.idx}</Td>
                <Td>{props.name}</Td>
                <Td>
                    <Image
                        w="70px"
                        src={props.image && (props.image.includes('http') || props.image.includes('https')) ? props.image : `${API_URL}${props.image}`}
                    />
                </Td>
                <Td>{props.price}</Td>
                <Td>{props.description}</Td>
                <Td>{props.category}</Td>
                <Td>{props.stock}</Td>
                <Td>
                    {/* BUTTON EDIT PRODUCT BRANCH ADMIN */}
                    <Button
                        onClick={modalEdit.onOpen}
                        _hover=""
                        mr="4"
                        leftIcon={<FaRegEdit />}
                        colorScheme='blue'
                        variant='ghost'
                        p={'2'}
                        size='xs'
                        letterSpacing={'tight'}
                    >
                        Edit
                    </Button>

                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={modalEdit.isOpen}
                        onClose={modalEdit.onClose}
                        size="2xl"
                    >
                        <ModalOverlay />
                        <ModalContent
                            color={"black"}
                        >
                            <ModalHeader color="black">
                                Edit Existing Product
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody as={Flex} pb={6}>
                                <Box flex={"1"} px="4">
                                    <FormControl>
                                        <FormLabel
                                            color={"black"}
                                        >
                                            Product
                                        </FormLabel>
                                        <Input
                                            ref={initialRef}
                                            placeholder="Enter product name"
                                            _hover={""}
                                            bgColor="white"
                                            variant={"link"}
                                            borderColor="black"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            px={2}
                                            py={1}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            defaultValue={props.name}
                                        />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel color={"black"}>
                                            Price
                                        </FormLabel>
                                        <Input
                                            ref={initialRef}
                                            placeholder="Enter price"
                                            _hover={""}
                                            variant={"link"}
                                            borderColor="black"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            px={2}
                                            py={1}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            defaultValue={props.price}
                                        />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>
                                            Description
                                        </FormLabel>
                                        <Input
                                            ref={initialRef}
                                            placeholder="Enter Description"
                                            _hover={""}
                                            bgColor="white"
                                            variant={"link"}
                                            borderColor="black"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            px={2}
                                            py={1}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            defaultValue={props.description}
                                        />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel color={"black"}>
                                            Category
                                        </FormLabel>
                                        <Select
                                            bgColor={"white"}
                                            variant={"link"}
                                            placeholder="Select Option"
                                            borderColor="black"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                            defaultValue={props.category}
                                        >
                                            {printSelectOption()}
                                        </Select>
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>
                                            Stock
                                        </FormLabel>
                                        <Input
                                            ref={initialRef}
                                            placeholder="Enter Description"
                                            _hover={""}
                                            bgColor="white"
                                            variant={"link"}
                                            borderColor="black"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            px={2}
                                            py={1}
                                            onChange={(e) =>
                                                setStock(e.target.value)
                                            }
                                            defaultValue={props.stock}
                                        />
                                    </FormControl>
                                </Box>

                                <Box flex={"1"} px="4">
                                    <FormControl>
                                        <FormLabel color={"black"}>
                                            Product Image
                                        </FormLabel>
                                        <Button
                                            bgColor="green.500"
                                            color="black"
                                            rounded={"md"}
                                            h={"10"}
                                            _hover={""}
                                            p={"2.5"}
                                            variant={"link"}
                                            onClick={() =>
                                                inputFile.current.click()
                                            }
                                        >
                                            <HiDocumentAdd
                                                color="black"
                                                size={"md"}
                                            />
                                            Add a File
                                        </Button>
                                        <input
                                            type="file"
                                            id="file"
                                            ref={inputFile}
                                            style={{ display: "none" }}
                                            onChange={onChangeFile}
                                        ></input>
                                    </FormControl>

                                    <Image
                                        objectFit="cover"
                                        size="4xl"
                                        src={
                                            fileProduct
                                                ? URL.createObjectURL(
                                                    fileProduct
                                                )
                                                : ""
                                        }
                                        w="full"
                                    ></Image>
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    bgColor="green.500"
                                    color="white"
                                    _hover=""
                                    mr={3}
                                    type="button"
                                    onClick={btnEdit}
                                >
                                    Save
                                </Button>
                                <Button
                                    bgColor="green"
                                    color="white"
                                    _hover=""
                                    onClick={modalEdit.onClose}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Td>

                {/* BUTTON DELETE PRODUCT BRANCH ADMIN */}
                <Td>
                    <Flex
                        alignItems="center"
                        gap="2"
                        w="100%"
                    >
                        <Switch
                            colorScheme="red"
                            isChecked={props.isDeleted}
                            onChange={() => {
                                btnDelete(props.uuid, !props.isDeleted);
                            }}
                        />
                        <Box
                            bg={props.isDeleted ? 'red.500' : 'green.500'}
                            color="white"
                            p="1"
                            borderRadius="md"
                            textAlign="center"
                        >
                            {props.isDeleted ? 'inactive' : 'active'}
                        </Box>
                    </Flex>
                </Td>
            </Tr>
        </Tbody>
    );
}

export default ProductManagementTwo;