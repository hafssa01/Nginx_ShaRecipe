import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// Import images from the assets folder
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

function CarouselComponent() {
  const carouselContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '50px' // Adjust the margin as needed
  };

  return (
	<div style={carouselContainerStyle}>
	  <Carousel data-bs-theme="dark">
		<Carousel.Item>
		  <img
			className="d-block w-100"
			src={slide1}
			alt="First slide"
		  />
		</Carousel.Item>
		<Carousel.Item>
		  <img
			className="d-block w-100"
			src={slide2}
			alt="Second slide"
		  />
		</Carousel.Item>
		<Carousel.Item>
		  <img
			className="d-block w-100"
			src={slide3}
			alt="Third slide"
		  />
		</Carousel.Item>
	  </Carousel>
	</div>
  );
}

export default CarouselComponent;