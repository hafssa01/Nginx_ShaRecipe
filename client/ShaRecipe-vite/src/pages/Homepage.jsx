import React from 'react';
import NavBar from '../components/Navscroll';
import Footer from '../components/Footer';
import CarouselComponent from '../components/carousel';
import CardComponent from '../components/cards';

function Home() {
  return (
    <div>
      <NavBar />

      <CarouselComponent />
      <CardComponent />

      <Footer/>
      
 
    </div>
  );
}

export default Home;
