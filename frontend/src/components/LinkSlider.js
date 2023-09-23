import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LinkSlider.css";
import { Grid, Paper, Button, Divider } from '@material-ui/core';
import t1 from '../Img/t1.png';
import t2 from '../Img/t2.png';
import t3 from '../Img/t3.png';
import t4 from '../Img/t4.png';
import t5 from '../Img/Icon1.png';
import t6 from '../Img/icon2.png';
import mixpanel from "mixpanel-browser"; 

const links = [
  { id: 1, title: "Entrepreneur", content: "To get IIITH research support for your startup. ", highlight: "Contact us.", image: t4, path: "/Entrepreneur" },
  { id: 2, title: "Industry", content: "To license Technology from IIITH. ", highlight: "Contact us.", image: t2, path: "/Industry" },
  { id: 3, title: "Job Seeker", content: "To work at Product labs. ", highlight: "Contact us.", image: t3, path: "/JobSeeker" }
];

export default function ImageSlider() {
  const [startIndex, setStartIndex] = useState(0);

  const slideLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const slideRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, links.length - 3)
    );
  };

  // Function to track a navigation event
  const trackNavigation = (contactforms) => {
    mixpanel.track('Contact us', { 'Contact Forms': contactforms});
  };

  return (
    <div className="link-slider">
      <div className="link-slider__buttons">
        <div className="link-slider__wrapper">
          <div className="link-slider__container">
            {links.slice(startIndex, startIndex + 3).map((link) => (
              <Link to={link.path} key={link.id} style={{textDecoration:'none'}}
              onClick={() => {
                trackNavigation(link.title); // Track the Contact us event
                mixpanel.track('Contact us', { 'Contact Forms': link.title }); // Track the event in Mixpanel
              }}
              >
                <Paper
                  style={{
                    width: "23vw",
                    height: "9vw",
                    boxShadow: "0px 4px 10px 5px rgba(209, 209, 209, 0.63)",
                    margin: "0 0.8vw",
                    textDecoration:'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row", margin: "0.4vw 0 0" }}>
                    <div style={{ flex: 1,margin: "2vw 0.3vw 0" }}>
                      <img src={link.image} alt="lorem" style={{ width: "80%" }} />
                    </div>
                    <div style={{ flex: 3 }}>
                      <p style={{ fontSize: "1.6vw", color: "#434343", fontWeight: 600, margin:'1.5vw 0 0' }}>{link.title} </p>
                      <p style={{ fontSize: "1.0417vw", fontWeight: 400, color: "#434343", lineHeight:'1.5vw', width:'90%', margin:'left' }}>
                        {link.content}
                        <span style={{ color: 'blue' }}>{link.highlight}</span>
                      </p>
                    </div>
                  </div>
                </Paper>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
