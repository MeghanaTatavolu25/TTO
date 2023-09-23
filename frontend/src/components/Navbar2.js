import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "../styles/Navbar2.css";
import mixpanel from 'mixpanel-browser';

const ResponsiveNavbar = () => {
  // Function to track a navigation event
  const trackNavigation = (menubarnames) => {
    mixpanel.track('Menu bar', { 'Menu': menubarnames });
  };

  return (
    <Navbar style={navbarStyle} className="fixed-top">
      <Nav className="mx-auto d-flex justify-content-center" style={{ gap: '5.5vw' }}>
        <NavLink
          exact
          to="/"
          className="navHover"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          onClick={() =>{
            trackNavigation('Home');
            mixpanel.track('Menu bar', { 'Menu': 'Home' }); // Track the event in Mixpanel
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/Technology_Catalogues"
          className="navHover"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          onClick={() =>{
            trackNavigation('Technology Catalogue');
            mixpanel.track('Menu bar', { 'Menu': 'Technology Catalogue' }); // Track the event in Mixpanel
          }}
        >
          Technology Catalogue
        </NavLink>
        <NavLink
          to="/Startups"
          className="navHover"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          onClick={() =>{
            trackNavigation('Startups');
            mixpanel.track('Menu bar', { 'Menu': 'Startups' }); // Track the event in Mixpanel
          }}
        >
          Startups
        </NavLink>
        <NavLink
          to="/patents"
          className="navHover"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          onClick={() =>{
            trackNavigation('Patents');
            mixpanel.track('Menu bar', { 'Menu': 'Patents' }); // Track the event in Mixpanel
          }}
        >
          Patents
        </NavLink>
        <NavLink
          to="/Products"
          className="navHover"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          onClick={() =>{
            trackNavigation('Products');
            mixpanel.track('Menu bar', { 'Menu': 'Products' }); // Track the event in Mixpanel
          }}
        >
          Products
        </NavLink>
        <a
          href="https://canvas.iiithcanvas.com/"
          className="navHover"
          style={navLinkStyle}
          target="_blank"
          onClick={() =>{
            trackNavigation('IIITH-Canvas');
            mixpanel.track('Menu bar', { 'Menu': 'IIITH-Canvas' }); // Track the event in Mixpanel
          }}
        >
          IIITH-Canvas
        </a>
        <a
          href="https://devportal.iiithcanvas.com/login"
          className="navHover"
          style={navLinkStyle}
          target="_blank"
          onClick={() =>{
            trackNavigation('APIs');
            mixpanel.track('Menu bar', { 'Menu': 'APIs' }); // Track the event in Mixpanel
          }}
        >
          APIs
        </a>
        <a
          href="https://portal2022-rndshowcase.iiit.ac.in/expo-hall/"
          className="navHover"
          style={navLinkStyle}
          target="_blank"
          onClick={() =>{
            trackNavigation('R&D Showcase');
            mixpanel.track('Menu bar', { 'Menu': 'R&D Showcase' }); // Track the event in Mixpanel
          }}
        >
          R&amp;D Showcase
        </a>
        <NavLink
          to="/Team"
          className="navHover"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          onClick={() =>{
            trackNavigation('The Team');
            mixpanel.track('Menu bar', { 'Menu': 'The Team' }); // Track the event in Mixpanel
          }}
        >
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
