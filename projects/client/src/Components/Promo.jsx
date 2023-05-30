import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Image, 
  HStack 
} from '@chakra-ui/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import promo1 from '../Asset/promo1.png';
import promo2 from '../Asset/promo2.png';
import promo3 from '../Asset/promo3.png';

function Promo() {
  const slides = [promo1, promo2, promo3];
  const [activeSlide, setActiveSlide] = useState(0);

  const goToPreviousSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      width={{ base: 'auto', sm: 'auto', md: 'auto', lg: 'auto' }}
      height={{ base: 'auto', sm: 'auto', md: 'auto', lg: 'auto' }}
      px={{ base: '4', sm: '8', md: '12', lg: '20' }}
      py={{ base: '2', sm: '2', md: '2', lg: '2' }}
      backgroundColor="white"
      position="relative"
      overflow="hidden"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform={`scale(${activeSlide === 0 ? 0.9 : 0.9})`}
        transition="transform 0.3s ease"
      >
        <Image
          objectFit={'contain'}
          w="100%"
          h="100%"
          src={slides[activeSlide]}
          alt={`Slide ${activeSlide + 1}`}
        />
      </Box>
      <HStack
        position="absolute"
        top="50%"
        spacing={4}
        transform="translateY(-50%)"
        left={{base: 2, sm: 2, md:14, lg: 14}}
        zIndex={1}
      >
        <Box
          as={BsChevronLeft}
          cursor="pointer"
          size="24px"
          onClick={goToPreviousSlide}
          opacity={activeSlide === 0 ? 0.3 : 1}
          pointerEvents={activeSlide === 0 ? 'none' : 'auto'}
        />
      </HStack>
      <HStack
        position="absolute"
        top="50%"
        spacing={4}
        transform="translateY(-50%)"
        right={{base: 2, sm: 2, md:14, lg: 14}}
        zIndex={1}
      >
        <Box
          as={BsChevronRight}
          cursor="pointer"
          size="24px"
          onClick={goToNextSlide}
          opacity={activeSlide === slides.length - 1 ? 0.3 : 1}
          pointerEvents={activeSlide === slides.length - 1 ? 'none' : 'auto'}
        />
      </HStack>
    </Box>
  );
}

export default Promo;
