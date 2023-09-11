import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "../styles/Navbar2.css";

const ResponsiveNavbar = () => {
  return (
    <Navbar style={navbarStyle} className="fixed-top">
      <Nav className="mx-auto d-flex justify-content-center" style={{ gap: '5.5vw' }}>
        <NavLink exact to="/" className="navHover" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/Technology_Catalogues" className="navHover" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          Technology Catalogue
        </NavLink>
        <NavLink to="/Startups" className="navHover" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          Startups
        </NavLink>
        <NavLink to="/patents" className="navHover" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          Patents
        </NavLink>
        <NavLink to="/Products" className="navHover" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          Products
        </NavLink>
        <a href="https://canvas.iiithcanvas.com/" className="navHover" style={navLinkStyle} target="_blank">
          IIITH-Canvas
        </a>
        <a href="https://devportal.iiithcanvas.com/login" className="navHover" style={navLinkStyle} target="_blank">
          APIs
        </a>
        <a href="https://portal2022-rndshowcase.iiit.ac.in/expo-hall/" className="navHover" style={navLinkStyle} target="_blank">
          R&amp;D Showcase
        </a>
        <NavLink to="/Team" className="navHover" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          The Team
        </NavLink>
      </Nav>
    </Navbar>
  );
};

const navbarStyle = {
  background: 'linear-gradient(90deg, #21328F 0%, #3085BF 73.54%, #7D4ABC 100%)',
  height: '2.8vw',
  position: 'fixed',
  marginTop: '4.3%',
  right: '0',
  left: '0',
};

const navLinkStyle = {
  fontSize: '1vw',
  fontFamily: 'Prompt',
  letterSpacing: '0.01em',
  color: '#FFFFFF',
  fontWeight: 400,
  textDecoration: 'none',
};

const activeNavLinkStyle = {
  position: 'relative',
  textDecoration: 'none',
  borderBottom: '0.0521vw solid white',
  paddingBottom: '0.1041vw',
  
};

export default ResponsiveNavbar;
