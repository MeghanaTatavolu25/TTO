import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Pagination.css"
import Container from 'react-bootstrap/Container'
import { Button, Row, Col } from 'react-bootstrap';
import icon from '../Img/logo.png'
import Chatbot from '../chatbot/Chatbot';
import LoadingSpinner from '../Img/loading.gif'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import print from '../Img/print.png';
import mixpanel from 'mixpanel-browser';

const ProductLab_Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("none");
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const [isLoading, setIsLoading] = useState(true);
  const [researchLabs, setResearchLabs] = useState([]); // State to store research labs data

  useEffect(() => {
    Promise.all([
      fetch('https://ttobackend.iiithcanvas.com/api/productlab'),
      fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
    ])
      .then(([productsResponse, researchLabsResponse]) => Promise.all([productsResponse.json(), researchLabsResponse.json()]))
      .then(([productsData, researchLabsData]) => {
        setProducts(productsData);
        setResearchLabs(researchLabsData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const getProductImageURL = (product) => {
    if (product.ProductLabImage.key) {
      const baseS3URL = 'https://tto-asset.s3.ap-south-1.amazonaws.com/'; // Replace with your S3 base URL
      const imageURL = `${baseS3URL}${product.ProductLabImage.key}`;
      return imageURL;
    }
    else {
      return icon; 
    }
  };

  const researchLabNamesMap = researchLabs.reduce((map, lab) => {
    map[lab._id] = lab.Research_Lab;
    return map;
  }, {});

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    const sortedItems = products.slice();     
    switch (sortOption) {
      case "newest":
        sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;      
      case "az":
        sortedItems.sort((a, b) => a.NameOfProduct.localeCompare(b.NameOfProduct));
        break;
      case "za":
        sortedItems.sort((a, b) => b.NameOfProduct.localeCompare(a.NameOfProduct));
        break;
      default:
        break;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Create an array of 6 items, even if there are fewer products
    const pageItems = Array.from({ length: itemsPerPage }, (_, index) => sortedItems[startIndex + index] || null);
  
    return pageItems;
  };
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
      pdf.save('products.pdf');
    });
  };

  // Function to track a navigation event
  const productsTracking = (productnames) => {
    mixpanel.track('Product Labs Products', { 'About Product Labs Product': productnames });
  };
  
  return (
    <>
    <Chatbot />
      <p style={{ fontFamily: "Prompt", fontSize: "1.145vw", margin: "0", padding: "8vw 3vw 0" }}>
        <a href="/" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}
        >
          <span>Home </span>/
        </a>
        <span style={{ color: '#1F669F', fontWeight: 500 }}> All Products
        </span>
      </p>
      <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', padding: "1.5vw 0 0", letterSpacing: "0em" }}>
        <div style={{ display: "flex", width:'100%' }}>
          <div style={{ color: "#343434", fontSize: "2.49vw", fontWeight: 400, margin: "0", letterSpacing: "-0.04em", width: "77%" }}>All Products</div>
          <div style={{ fontSize: "1.6vw", fontWeight: 300, margin: "1vw 0 0", letterSpacing: "-0.04em", width: "23%",textAlign:'right' }}>
            <label htmlFor="sort-select" style={{ color: "#343434", fontSize: "1.4vw" }}>Sort By :&nbsp;</label>
            <select id="sort-select" value={sortOption} onChange={handleSortChange} style={{fontWeight: '400',letterSpacing: '0.02em',color: "#1369CB", border: "none", outline: 0}}>
              <option >None</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>
        <div style={{ background: "#343434", height: "0.156249vw", marginTop:'0.5vw' }}></div>
      </Container>
      <Container style={{ maxWidth: "82%", marginBottom: '5vw' }}>
        <Row>
        {isLoading ? ( // Display loading symbol if isLoading is true
            <div style={{height:'25vw'}}>
              <img src={LoadingSpinner} alt="Loading" style={{width:'5vw', height:'5vw',margin:'12vw 36vw 0'}} />
            </div>
          ) : (
            // Render products when data is available
          getPageItems().map((product, index) => (
        <Col key={index} lg={4}>
          {product ? (
              <a 
                href={`/Products_Technologies/${researchLabNamesMap[product.CentreName]}/${encodeURIComponent(product.NameOfProduct)}`} 
                style={{ textDecoration: 'none', width:'80%' }}
                onClick={() =>{
                  productsTracking(product.NameOfProduct);
                  mixpanel.track('Products', { 'About Products': product.NameOfProduct }); // Track the event in Mixpanel
              }}>
                <div 
                  style={{ letterSpacing: "-0.04em", lineHeight: "1.5vw", fontFamily: 'Prompt',margin: '0.7vw 0 1vw', marginLeft:'1.3vw', width:'90%',border: '1px solid #DCECFD',background: 'rgba(236, 243, 252, 0.60)' }}
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
                  <div className="content-container" style={{ display: "flex", alignItems: "flex-start", margin:'0.5vw 1.2vw 0', width: '100%' }}>
                    <div style={{width: '18%', height: '3vw'}}>
                    <img src={getProductImageURL(product)} alt="/" style={{width: '100%',height: '100%',objectFit: 'contain',border: '1px solid #D3E6F9', background: 'white' }} />
                    </div>
                    <h2 className="underline-on-hover" style={{ width: '80%', color: "#353535", fontSize: "1.145826vw", fontWeight: 400, margin:'1vw 1vw 0.5vw', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{product.NameOfProduct}</h2>
                  </div>
                  <p style={{ lineHeight: '1.2vw',margin:'0.5vw 1.1vw 0.2vw', color: "#757575", fontSize: "1vw", fontWeight: 400, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{product.Description}</p>
                  <div style={{ marginLeft: '1.1vw', color: "#A7A6A6", fontSize: "0.8vw", fontWeight: 300,textDecoration: 'none'  }}>
                     <div style={{margin:'0 0 0.1vw'}}>Professor - {product.Faculty_Name}</div>
                      <a href={`/Lab_Technologies/${researchLabNamesMap[product.CentreName]}`} style={{textDecoration:'none'}} >
                      <p style={{lineHeight:'0.8vw',color: "#A7A6A6", textDecoration:'none'}}>Center - <span className='s-center'>{researchLabNamesMap[product.CentreName]}</span></p>
                      </a>
                  </div>
                </div>
              </a>
           ) : (
            // Render empty space placeholder
            <div style={{ width: '100%', height: '12.35vw' }} />
          )}
        </Col>
       ))
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

    </>
  );
}

export default ProductLab_Products;
