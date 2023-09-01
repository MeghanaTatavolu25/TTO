import React from "react";
import call_img from './call.png'
import mail_img from './mail.png'
import { Grid, Paper, Button, Divider } from '@material-ui/core';
const Footbar = () => {
  return (

    <div style={{ paddingTop: "7vw" }}>
      <Grid container spacing={0} style={{ paddingBottom: "1vw", background: 'linear-gradient(136deg, #21328F 3.00%, #3084BE 64.43%, #7D4ABC 100%)', fontFamily: "Prompt" ,letterSpacing: '-0.01'}}>


        <Grid item xs={1} sm={1} md={1}></Grid>

        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "5.5vw", paddingLeft:'4vw',paddingBottom:'2vw' }}>
          <div style={{ paddingBottom: "2vw" }}>

            <img src={call_img} alt="icon" style={{width:'3vw', height:'3vw'}} />

            <span style={{ paddingLeft: "1.1vw", fontSize: "1.0417vw", color: "#FFFFFF" }}> 91-0990897689</span>

          </div>
          <div style={{ paddingBottom: "1vw" }}>
            <img src={mail_img} alt="icon" style={{width:'3vw', height:'3vw'}} />

            <span style={{ paddingLeft: "1.1vw", fontSize: "1.0417vw", color: "#FFFFFF" }}> www.tto.iiit.ac.in</span>

          </div>

        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "4.5vw" }}>
          <p style={{ color: "#FFFFFF", fontWeight: 500, fontSize: "2vw", paddingBottom: "0vw" }}>About us</p>
          <p style={{ color: "#FFFFFF", fontWeight: 300, fontSize: "1.0417vw" }} >We manages the transfer process of Intellectual Property (IP) produced in IIIT-H to appropriate bodies including industry, entrepreneurs, etc. and makes all attempts to commercialize the IP. We provides a platform where IP meets potential users and financiers. This in a way contributes towards IIIT-H's primary responsibility of fostering, stimulating and encouraging create activities in science and technology in the widest sense.
 </p>

        </Grid>
      </Grid>
    </div>
  );
}

export default Footbar;