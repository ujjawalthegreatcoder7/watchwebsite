import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homepage from "./assets/homepage.png"
import homepage2 from "./assets/homepage2.png"
import homepage3 from "./assets/homepage3.png"
import homepage4 from "./assets/homepage4.png"
import homepage5 from "./assets/homepage5.png"

import { Carousel } from 'react-bootstrap';

const AutoSlidingCarousel = () => {
  const [index, setIndex] = useState(0);

  // Function to handle the slide change
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 5); // Change slide every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} className='slider' >
      <Carousel.Item>
        <img className="d-block w-100" src={homepage} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={homepage2}   alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={homepage3}   alt="Third slide" />
      </Carousel.Item>    
        <Carousel.Item>
        <img className="d-block w-100" src={homepage4}   alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={homepage5}   alt="Third slide" />
      </Carousel.Item>

    </Carousel>
  );
};

export default AutoSlidingCarousel;