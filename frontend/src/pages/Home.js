import React from "react"
import { useState, useEffect } from "react";
import "../styles/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Button } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import img2 from '../Img/image 2.png'
import img13 from '../Img/image 13.png'
import img14 from '../Img/image 14.png'
import landing from '../Img/landing.png'
import icon1 from '../Img/Icon1.png'
import icon2 from '../Img/icon2.png'
import icon3 from '../Img/icon3.png'
import Chatbot from "../chatbot/Chatbot"
import t1 from '../Img/t1.png'
import t2 from '../Img/t2.png'
import t3 from '../Img/t3.png'
import t4 from '../Img/t4.png'
import ImageSlider from "../components/LinkSlider"
import ResponsiveImage from "../components/ResponsiveImage"
import mixpanel from 'mixpanel-browser';


const items = [
    { 
        id: 1,
        heading: "Startup Seeding",
        icon: icon1,
        image: img2,
        description: "Enabling enterprenuers to create startups from research output",
        links: 'https://cie.iiit.ac.in/'
    },
    {
        id: 2,
        heading: "Technology Licensing",
        icon: icon2,
        image: img13,
        description: "Program to transfer technology to  Startups and Industry",
        links: './Technologylicensing'
    },
    {
        id: 3,
        heading: "Productize",
        icon: icon3,
        image: img14,
        description: "Unique program to bridge technology to market needs",
        links: './Productize'
    },
];

// Function to track a items
const trackNavigation = (cardheadings) => {
mixpanel.track('Cards', { 'Card headings': cardheadings });
};

const Item = ({id, heading, icon, image, description,links, text }) => (
    <>
        <div
            style={{
                borderRadius: '2.27vw',
                border: '3px solid rgba(105, 120, 255, 0.41)',
                background: 'linear-gradient(108deg, rgba(255, 255, 255, 0.80) 2.34%, rgba(255, 255, 255, 0.16) 100%)',
                boxShadow: '0px 0px 50px -25px rgba(0, 0, 0, 0.50)',
                backdropFilter: 'blur(1.0741vw)',
                flexShrink: '0',
                height: "24.5vw",
                width:'19.5vw',
                padding: "1vw 1.5vw",
                transition: "transform 0.3s, box-shadow 0.3s", 
                transformOrigin: "center",
                transform: "scale(1)", 
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; 
                e.currentTarget.style.boxShadow =
                    "0px 0px 50px -25px rgba(0, 0, 0, 0.7), 0px 0px 30px -15px rgba(0, 0, 0, 0.3)"; 
                    e.currentTarget.style.backdropFilter='blur(1.0741vw)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; 
                e.currentTarget.style.boxShadow =
                    "0px 0px 50px -25px rgba(0, 0, 0, 0.5)";
                    e.currentTarget.style.backdropFilter='blur(10px)';
            }}
        >
             <ResponsiveImage src={icon} alt="icon" maxWidth={380} maxHeight={280} />
                <div className="myheading">{heading}</div>
                <div className="mydescription">{description}</div>
                {/* Check if the id is 1, if yes, add target="_blank" to the link */}
                {id === 1 ? (
                    <a href={links} target="_blank" style={{ textDecoration: 'none' }} 
                    onClick={() => {
                        trackNavigation(heading); // Track the cards event
                        mixpanel.track('Cards', { 'Card headings': heading }); // Track the event in Mixpanel
                    }}
                    >
                    <div className="visitpage">Visit Page</div>
                    </a>
                ) : (
                    <a href={links} style={{ textDecoration: 'none' }}
                    onClick={() => {
                        trackNavigation(heading); // Track the cards event
                        mixpanel.track('Cards', { 'Card headings': heading }); // Track the event in Mixpanel
                    }}
                    >
                    <div className="visitpage">Visit Page</div>
                    </a>
                )}
                </div>
            </>
);


const Home = () => {

    const [centers, setCenters] = useState([]);
    const [startup,setstartup]=useState([]);
    const [patent,setpatent]=useState([]);
    const [product,setproduct]=useState([]);
    const [researchLabs, setResearchLabs] = useState([]);
    const [productCenters, setProductCenters] = useState([]);

    useEffect(() => {
        fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
        // fetch('http://localhost:3002/api/researchlabs')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);
                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setCenters(randomCenter);
                    let ageText;
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo1(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        fetch('https://ttobackend.iiithcanvas.com/api/startups')
        // fetch('http://localhost:3002/api/startups')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);
                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setstartup(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    let ageText;

                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo2(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        Promise.all([
            fetch('https://ttopatents.iiithcanvas.com/patents/patents'),
            fetch('https://ttobackend.iiithcanvas.com/api/researchlabs'),
          ])
            .then(([patentsResponse, researchLabsResponse]) =>
              Promise.all([patentsResponse.json(), researchLabsResponse.json()])
            )
            .then(([patentsData, researchLabsData]) => {
                // Filter out centers with valid Est_Year values
                const validCenters = patentsData.filter(center => center.Published_Date);

                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.Published_Date - a.Published_Date);
                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setpatent(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.Published_Date, new Date());
                    let ageText;
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo3(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter);

                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
                setResearchLabs(researchLabsData);
            })
            
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);

    const researchLabNames = researchLabs.reduce((map, lab) => {
        map[lab._id] = lab.Research_Lab;
        return map;
      }, {});
    
    useEffect(() => {
        Promise.all([
            fetch('https://ttobackend.iiithcanvas.com/api/productlab'),
            fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
          ])
        .then(([productsResponse, researchLabsResponse]) => Promise.all([productsResponse.json(), researchLabsResponse.json()]))
        .then(([productsData, researchLabsData]) => {
                // Filter out centers with valid Est_Year values
                const validCenters = productsData.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);

                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));

                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    let ageText;
                    // Update the state with the selected center
                    setproduct(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo4(ageText);
                    // const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    // setMonthsAgo4(monthsDifference);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
                setProductCenters(researchLabsData);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);

    const productCenterName = productCenters.reduce((map, lab) => {
        map[lab._id] = lab.Research_Lab;
        return map;
      }, {});
    const calculateMonthsDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const monthsDifference = (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());
        return monthsDifference;
      };

    // Function to track a navigation event
    const trackNavigation = (explorepagenames) => {
        mixpanel.track('Explore Pages', { 'Explore pages': explorepagenames });
      };

    return (
        <>
            <div className="home" style={{fontFamily: "Prompt" }} >
                <Chatbot />
                <Container style={{
                   maxWidth: "90%",
                   height: "37.5vw",
                   padding: "1vw 0 0 0",
                   flexShrink: 0,
                   backgroundImage: `url(${landing})`,
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                }}>

                    <p className="text-center" style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "3.6vw", color: "#FCFCFC", letterSpacing:'0.02em', marginLeft:'0.1vw' }}>Technology Transfer Office</p>
                    <Grid container spacing={2} justify="space-between" style={{ padding: "3vw 2.5vw 0", width: "100%", marginLeft:'0.1vw' }}>
                        <Grid item xs={3} sm={3} md={3} style={{ marginLeft: "6vw" }}>
                            <Item {...items[0]} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <Item {...items[1]} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} style={{ marginRight: "5.5vw" }}>
                            <Item {...items[2]} />
                        </Grid>
                    </Grid>
                </Container>

                <Container style={{ maxWidth: "80%", fontFamily: 'Prompt', paddingTop: "2em" }}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.708316vw", fontWeight: 400 }}>Technology Catalogue</p>
                        </Grid>
                        
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353', marginTop:'-1vw' }}></Grid>
                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t1}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                            <a 
                            href={`/Lab_Technologies/${centers.Research_Lab}/${centers.ResearchLabCode}`} 
                            style={{ textDecoration: 'none',color: "#434343" }} 
                            // onClick={() => trackNavigation(`External Link - ${centers.Research_Lab}`)}
                            >
                                <p style={{color: "#434343", fontWeight: 400, fontSize: "1.66vw", lineHeight:'1.7vw' }}>{centers.Research_Lab}</p>
                                <p style={{color: "#434343", fontWeight: 400, fontSize: "1.0417vw", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }} >
                                {centers.Description}   
                                </p>
                            </a>
                            <a href="./Technology_Catalogues" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                            <Button 
                                variant="contained" 
                                className="buttons" 
                                style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.0417vw", color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 3.5vw", height: '3.5vw',margin:'2vw 0 0' }} 
                                onClick={() => {
                                    trackNavigation('Explore catalogues'); // Track the Explore Pages event
                                    mixpanel.track('Explore Pages', { 'Explore pages': 'Explore catalogues' }); // Track the event in Mixpanel
                                  }}
                            >
                                Explore catalogues
                            </Button>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{ paddingTop: "5vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.708316vw", fontWeight: 400 }}>Startups</p>
                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353',  marginTop:'-1vw' }}></Grid>
                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                            <a 
                            href={startup.Website} style={{ textDecoration: 'none' }} 
                            target="_blank" 
                            // onClick={() => trackNavigation(`External Link - ${startup.StartUp_Name}`)}
                            >
                                <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.66vw", lineHeight:'1.7vw' }}>{startup.StartUp_Name}</p>
                                <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.0417vw",display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis"}} >{startup.Idea_Description}</p>
                            </a>
                            <a href="./Startups" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                            <Button 
                                variant="contained" 
                                className="buttons" 
                                style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.0417vw", color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 3.5vw", height: '3.5vw',margin:'2vw 0 0' }}
                                onClick={() => {
                                    trackNavigation('Explore startups'); // Track the Explore Pages event
                                    mixpanel.track('Explore Pages', { 'Explore pages': 'Explore startups' }); // Track the event in Mixpanel
                                  }}
                            >
                                Explore startups
                            </Button>
                            </a>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t2}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{ paddingTop: "5vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.708316vw", fontWeight: 400 }}>Patents</p>
                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353',  marginTop:'-1vw' }}></Grid>
                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t3}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.66vw", lineHeight:'1.7vw' }}>{patent.Title}</p>
                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.0417vw" }} >
                                Research Lab - {researchLabNames[patent.Center_Name]}
                            </p>
                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.0417vw" }} >
                              Faculty - {patent.Faculty_List && patent.Faculty_List.length > 1 ? patent.Faculty_List.join(', ') : patent.Faculty_List}
                            </p>
                            <a href="/patents" style={{ textDecoration: 'none',color: '#FFFFFF' }} onClick={() => trackNavigation(heading)}>
                              <Button 
                                variant="contained"
                                className="buttons" 
                                style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.0417vw", color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 3.5vw", height: '3.5vw',margin:'2vw 0 0' }}
                                onClick={() => {
                                    trackNavigation('Explore patents'); // Track the Explore Pages event
                                    mixpanel.track('Explore Pages', { 'Explore pages': 'Explore patents' }); // Track the event in Mixpanel
                                  }}
                              >
                                Explore patents
                              </Button>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{ paddingTop: "5vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.708316vw", fontWeight: 400 }}>Products</p>
                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353',  marginTop:'-1vw' }}></Grid>
                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                        <a 
                        href={`/Products_Technologies/${productCenterName[product.CentreName]}/${encodeURIComponent(product.NameOfProduct)}`} 
                        style={{ textDecoration: 'none' }} 
                        // onClick={() => trackNavigation(`External Link - ${product.NameOfProduct}`)}
                        >
                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.66vw", lineHeight:'1.7vw' }}>{product.NameOfProduct}</p>
                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.0417vw",display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }} >{product.Description}</p>
                        </a>
                            <a href="./Products" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                              <Button 
                                variant="contained"
                                className="buttons" 
                                style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.0417vw", color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 3.5vw", height: '3.5vw',margin:'2vw 0 0' }}
                                onClick={() => {
                                    trackNavigation('Explore products'); // Track the Explore Pages event
                                    mixpanel.track('Explore Pages', { 'Explore pages': 'Explore products' }); // Track the event in Mixpanel
                                  }}
                              >
                                Explore products
                              </Button>
                            </a>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t4}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{ paddingTop: "5vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.708316vw", fontWeight: 400 }}>Contact us</p>
                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353',  marginTop:'-1vw' }}></Grid>
                    </Grid>
                </Container>
                <Container style={{ maxWidth: "80%", fontFamily: 'Prompt', padding: "3vw 0 7em" }}>
                    <ImageSlider />
                </Container>
            </div >
        </>
    );
}
export default Home;