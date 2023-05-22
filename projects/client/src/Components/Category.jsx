import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogBody, AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tbody, Td, Text, Tr, useDisclosure, useToast,
    Image, Box, Flex, Switch
} from '@chakra-ui/react';
import { HiDocumentAdd } from "react-icons/hi";
import { API_URL } from "../helper";


function Category(props) {
    const modalDelete = useDisclosure();
    const modalEdit = useDisclosure();
    const cancelRef = React.useRef();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [category, setCategory] = useState('');
    const toast = useToast();
    const [id, setId] = React.useState();
    const inputFile = useRef(null);
    const [fileCategory, setFileCategory] = useState(null);
    const modalCategory = useDisclosure();
    const [imageCategory, setImageCategory] = useState('');


    console.log("ini image category :", imageCategory )

    const onChangeFile = (event) => {
        modalCategory.onOpen();
        setFileCategory(event.target.files[0]);
        setImageCategory(URL.createObjectURL(event.target.files[0]));
      };


    const btnEdit = async () => {
        try {
          let token = localStorage.getItem('grocery_login');
      
          const formData = new FormData();
          formData.append('data', JSON.stringify({ category: category ? category : props.category }));
      
          if (fileCategory !== null) {
            formData.append('images', fileCategory);
          }
      
          let edit = await axios.patch(
            `http://localhost:8000/api/category/editcategory/${props.categoryId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
      
          if (edit.data.success) {
            setFileCategory(null);
            toast({
              position: 'bottom',
              title: `Edit Success`,
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
            props.getDataCategory();
            modalEdit.onClose();
            setId();
          }
        } catch (error) {
          console.log(error);
          toast({
            position: 'top',
            title: `${error.response.data.message}`,
            description: "Please Choose Another Category Name",
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      };
      

    const btnDelete = async () => {
        try {
            let token = localStorage.getItem('grocery_login');

            let deleteCategory = await axios.patch(`http://localhost:8000/api/category/deletecategory/${props.categoryId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(`res delete category`, deleteCategory);

            props.getDataCategory();
            modalDelete.onClose();
            // setId();
            toast({
                position: 'bottom',
                title: `Delete Success`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                position: 'top',
                title: `${error.response.data.message}`,
                description: "Failed to delete category.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };


    console.log(props.id)

    return (
        <Tbody>
            <Tr key={props.id}>
                <Td>{props.idx}</Td>
                <Td>{props.category}</Td>
                <Td>
                    <Image
                        w="70px"
                        src={props.imageCategory && (props.imageCategory.includes('http') || props.imageCategory.includes('https')) ? props.imageCategory : `${API_URL}${props.imageCategory}`}
                    />
                </Td>
                <Td>
                    {/* BUTTON EDIT */}
                    <Button
                        bgColor="green.500"
                        color="white"
                        onClick={modalEdit.onOpen}
                        mr='4'
                        _hover={""}
                    >
                        <Text>Edit</Text>
                    </Button>

                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={modalEdit.isOpen}
                        onClose={modalEdit.onClose}
                    >
                        <ModalOverlay />
                        <ModalContent bgColor="green.500" color={"#EEEEEE"}>
                            <ModalHeader color="#white">
                                Edit Existing Category
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>

                                <FormControl mt={4}>
                                    <FormLabel color={"#EEEEEE"}>
                                        Category
                                    </FormLabel>
                                    <Input
                                        ref={initialRef}
                                        placeholder="Enter new category name"
                                        _hover={""}
                                        bgColor="#white"
                                        color="green.500"
                                        variant={"link"}
                                        onChange={(e) => setCategory(e.target.value)}
                                        defaultValue={props.category}
                                    />
                                </FormControl>

                                <Box flex={"1"} px="4">
                                    <FormControl>
                                        <FormLabel color={"black"}>
                                            Category Image
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
                                        src={imageCategory ? imageCategory : ''}
                                        w="full"
                                    ></Image>
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    bgColor="green"
                                    color="#EEEEEE"
                                    _hover=""
                                    mr={3}
                                    type='button'
                                    onClick={btnEdit}
                                >
                                    Save
                                </Button>
                                <Button
                                    bgColor="#EEEEEE"
                                    color="green.500"
                                    _hover=""
                                    onClick={modalEdit.onClose}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Td>

                {/* BUTTON DELETE */}

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
                                btnDelete(props.id, !props.isDeleted);
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

export default Category;