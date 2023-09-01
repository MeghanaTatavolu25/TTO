import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "../Img/logo.png"
import ResponsiveImage from "../components/ResponsiveImage"

const Navbar1 = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      // variant="dark"
      style={navbarStyle}
      className="fixed-top"
    >
      {/* Navbar Brand (Image) */}
      <Navbar.Brand href="/" style={{ width:'7.5vw',height:'5vw' }}>
      {/* <ResponsiveImage src={Logo} alt="icon" maxWidth={159} maxHeight={80} /> */}

        <img
          src={Logo} // Update the image source as needed
          alt="Navbar Brand"
          style={{ width:'100%',height:'3.6vw' }} // Adjust image styles as desired
        />
      </Navbar.Brand>

      {/* Navbar Toggler */}
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

      {/* Navbar Collapse */}

    </Navbar>
  );
};

const navbarStyle = {
  padding:'0 1vw'
};


export default Navbar1;
