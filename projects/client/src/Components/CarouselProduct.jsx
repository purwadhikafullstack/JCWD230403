import Carousel from "react-multi-carousel";
import Products from "./product";
import { useState } from "react";
import axios from "axios";

function CarouselProduct() {

    // responsive template from lib
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    // state functional
    const [data, setData] = useState([]);

    // get product card
    const productData = async (req, res) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product`)

            setData(response.data)
        } catch (error) {
            console.log(error)
        }

    }
    
    const products = data.map(val => (
        <Products name={val.name} url={val.image} price={val.price} description={val.description}/>
    ))

    return (
        <> 
            <Carousel responsive={responsive}>
                {products}
            </Carousel>
        </>
    );
}

export default CarouselProduct;