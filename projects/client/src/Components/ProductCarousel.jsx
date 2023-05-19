import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    Button,
    ButtonGroup
} from '@chakra-ui/react';
  
function ProductCarousel(props) {
    return (
        <>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                        src={props.url}
                        alt='image product'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{props.name}</Heading>
                        <Text>
                            {props.desciption}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            {props.price}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button variant='solid' bg="#6FA66F">
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    );
}

export default ProductCarousel;