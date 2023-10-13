import React from 'react';
import { Carousel } from 'react-bootstrap'
import Home from '../Home/Home'
import Forms from '../Forms/Forms'
import SignedIn from '../SignedIn/SignedIn';
import Login from '../Login/Login';

// Homepage Carousel
const BootstrapCarousel = () => {

  return (
    <div>
      <Carousel style={{height: '100vh'}} interval={null}>
        <Carousel.Item>
          <div style={{height: '100vh', backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
            <Home />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={{height: '10', backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
            <Forms />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={{height: '10', backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
            <Login />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={{height: '100vh', backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
            <SignedIn />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BootstrapCarousel;
