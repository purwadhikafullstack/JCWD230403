import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogBody, AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tbody, Td, Text, Tr, useDisclosure, useToast
} from '@chakra-ui/react';


function Category(props) {
    const modalDelete = useDisclosure();
    const modalEdit = useDisclosure();
    const cancelRef = React.useRef();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [category, setCategory] = useState('');
    const toast = useToast();
    const [id, setId] = React.useState();


    const btnEdit = async () => {
        try {
            let edit = await axios.patch(`http://localhost:8000/api/category/editcategory/${props.categoryId}`, {
                category: category ? category : props.category
            });
            if (edit.data.success) {
                toast({
                    position: 'top',
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
            console.log(error)
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
          await axios.patch(`http://localhost:8000/api/category/deletecategory/${props.categoryId}`, {})
          props.getDataCategory();
          modalDelete.onClose();
          setId();
        } catch (error) {
          console.log(error);
        }
      };

    //   React.useEffect(() => {
    //     setId(props.id);
    //   }, [props.id]);
      
    console.log(props.id)

    return (
        <Tbody>
            <Tr key={props.id}>
                <Td>{props.idx}</Td>
                {/* <Td>{props.categoryId}</Td> */}
                <Td>{props.category}</Td>
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

                    {/* BUTTON DELETE */}
                    <Button colorScheme='red' onClick={modalDelete.onOpen}>
                        Delete
                    </Button>

                    <AlertDialog
                        isOpen={modalDelete.isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={modalDelete.onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Delete
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure want delete this ?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={modalDelete.onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={btnDelete} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                </Td>
            </Tr>
        </Tbody>
    );
}

export default Category;