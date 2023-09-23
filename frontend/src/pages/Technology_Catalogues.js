import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Pagination.css"
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import icon from '../Img/logo.png';
import Chatbot from "../chatbot/Chatbot"
import LoadingSpinner from '../Img/loading.gif'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import print from '../Img/print.png';
import mixpanel from 'mixpanel-browser';


const Technology_Catalogues = () => {
  const [technologycatalogues, setTechnologyCatalogues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9;
  const totalPages = Math.ceil(technologycatalogues.length / itemsPerPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
      .then(response => response.json())
      .then(data => {
        setTechnologyCatalogues(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const getResearchImageURL = (research_lab) => {
    if (research_lab.ResearchLogo.key) {
    const baseS3URL = 'https://tto-asset.s3.ap-south-1.amazonaws.com/';
    const imageURL = `${baseS3URL}${research_lab.ResearchLogo?.key}`; 
    return imageURL;
  }
  else {
    return icon; 
  }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    const filteredItems = technologycatalogues.filter(research_lab =>
      research_lab.Research_Lab.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredItems.slice(startIndex, endIndex);

    // Add empty space placeholders if there are fewer items than itemsPerPage
    while (pageItems.length < itemsPerPage) {
      pageItems.push(null);
    }

    return pageItems;
  };
  // const handlePrint = () => {
  //   window.print();
  // };

  const generatePDF = () => {
    // Get the entire document body
    const element = document.body;
  
    // Use html2canvas to capture the entire page
    html2canvas(element).then((canvas) => {
      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Add the captured canvas to the PDF
      pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, 210, 297);
  
      // Save the PDF as a file
      pdf.save('technology_catalogue.pdf');
    });
  };

// Function to track an event
const techCataloguesTracking = (technologycatalogues) => {
  mixpanel.track('Technology Catalogues', { 'About Tech Catalogue': technologycatalogues });
};


  return (
    <>
    <div id="page-content">
    <Chatbot />
      <p style={{ fontFamily: "Prompt", fontSize: "1.145vw", margin: "0", padding: " 8vw 3vw 0" }}>
        <a href="/" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Home </span>/
        </a>
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Technology Catalogue</span>
      </p>
      <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', padding: "1vw 0 0", letterSpacing: "0em" }}>
        <div style={{ display: "flex", height:'4vw' }}>
          <div style={{ color: "#343434", fontSize: "2.49vw", fontWeight: 400, margin: "0.5vw 0 0", letterSpacing: "-0.04em", width: "63vw" }}>Technology Catalogue</div>
          <div style={{ fontSize: "1.4vw", fontWeight: 300, margin: "0 0 0", letterSpacing: "-0.04em", width: "16vw" }}>
            <div className="search-container">
              <Paper
                elevation={0}
                style={{
                  backgroundColor: '#EEEEEE',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.3125vw',
                  borderRadius: '0.86vw',
                  maxHeight: '6vw',
                  margin:'0'
                }}
              >
                <IconButton
                  type="submit"
                  aria-label="search"
                  style={{
                    padding: 10,
                  }}
                >
                  <SearchIcon style={{ fontSize: "2vw" }} />
                </IconButton>
                <InputBase
                  placeholder="Search Labs"
                  style={{
                    fontSize: "1.245vw",
                    flex: 1,
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  // Add a class name for targeting the placeholder
                  classes={{ input: 'input-field' }}
                />
              </Paper>
            </div>
          </div>
        </div>
        <div style={{ background: "#343434", height: "0.156249vw", marginTop:'0.7vw' }}></div>
      </Container>

      <Container style={{ maxWidth: "82%", marginBottom: '1vw' }}>
        <Row >
          {isLoading ? ( // Display loading symbol if isLoading is true
            <div style={{height:'25vw'}}>
              <img src={LoadingSpinner} alt="Loading" style={{width:'5vw', height:'5vw',margin:'12vw 36vw 0'}} />
            </div>
          ) : (
            getPageItems().length > 0 ? (
              getPageItems().map((research_lab, index) => (
                <Col key={index} lg={4}>
                  {research_lab ? (
                    <a 
                      href={`/Lab_Technologies/${research_lab.Research_Lab}/${research_lab.ResearchLabCode}`} 
                      style={{ textDecoration: 'none',width:'80%' }}
                      onClick={() =>{
                        techCataloguesTracking(research_lab.Research_Lab);
                        mixpanel.track('Technology Catalogues', { 'About Tech Catalogue': research_lab.Research_Lab }); // Track the event in Mixpanel
                      }}
                    >
                      <div 
                        style={{ letterSpacing: "-0.04em", lineHeight: "1.5vw", fontFamily: 'Prompt', margin: '0.7vw 0 1vw', marginLeft:'1vw',width:'90%',border: '1px solid #DCECFD',background: 'rgba(236, 243, 252, 0.60)' }}
                        onMouseEnter={(e) => {
                          // e.currentTarget.style.transform = "scale(1.15)";
                          // e.currentTarget.style.boxShadow= "0px 4px 10px 5px rgba(209, 209, 209, 0.63)";
                          e.currentTarget.style.background='#DCEEFF';
                        }}
                        onMouseLeave={(e) => {
                          // e.currentTarget.style.transform = "scale(1)"; // Reset the scale
                          // e.currentTarget.style.boxShadow = "none"; // Reset the box shadow
                          e.currentTarget.style.background='rgba(236, 243, 252, 0.60)';
                        }}
                      >
                        <div className="content-container" style={{ display: "flex", margin: '0.5vw 1.2vw', width: '20vw' }}>
                          <div style={{ width: '20%', height: '3.7vw' }}>
                            <img src={getResearchImageURL(research_lab)} alt="/" style={{width: '100%',height: '100%',objectFit: 'contain',border: '1px solid #D3E6F9', background: 'white'}}/>
                          </div>
                          <h2 style={{ width: '80%', color: "#353535", fontSize: "1.145826vw", fontWeight: 400, margin: '1vw 0 0vw', marginLeft: '1vw', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{research_lab.Research_Lab}</h2>
                        </div>
                        <p style={{ lineHeight: '1.2vw', fontWeight: 400,margin:'0.5vw 1.1vw 0.6vw', color: "#757575", fontSize: "1vw", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{research_lab.Description}</p>
                      </div>
                    </a>
                  ) : (
                    // Render empty space placeholder
                    <div style={{ width: '100%', height: '7vw' }} />
                  )}
                </Col>
                  ))
                  ) : (
                    <div style={{ textAlign: 'center', margin: '15% auto', fontSize: '1.3vw' , width:'30%', height:'18vw'}}>
                      No catalogues found.
                    </div>
                  )
                )}
        </Row>
      </Container>

      {/* pagination  */}
      {totalPages > 1 && (
        <div className='pagination' style={{ fontFamily: "Inter" }}>
          {currentPage > 1 && (
            <div className="pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
              &lt;
            </div>
          )}
          <div className="pagination-box">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <div
                    key={pageNumber}
                    className={`pagination-button ${pageNumber === currentPage ? "current" : ""}`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </div>
                );
              } else if (
                (pageNumber === currentPage - 2 && currentPage > 3) ||
                (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNumber}>&hellip;</span>;
              }
              return null;
            })}
          </div>
          {currentPage < totalPages && (
            <div className="pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
              &gt;
            </div>
          )}
          <button onClick={generatePDF} style={{border:'none', background:'white', marginLeft:'1vw'}}><img src={print}/></button>
        </div>
      )}
</div>
    </>
  );
}

export default Technology_Catalogues;
