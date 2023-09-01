import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const DynamicTable = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>SI No</th>
                  <th>Title</th>
                  <th>Research Lab</th>
                  <th>Authors</th>
                  <th>Application/Patent No</th>
                  <th>Full Report</th>
                </tr>
              </thead>
              <tbody>
                {/* Table content */}
                <tr style={{ textAlign: 'center' }}>
                    <td >1</td>
                    <td >System And Method For Capturing Horizontal Disparity Stereo Panorama</td>
                    <td >CVIT</td>
                    <td >Prof. Anoop Namboodiri, Mr. Rajat Agarwal, Amrisha Vohra</td>
                    <td >US10154249B2 Application US15/627,224</td>
                    <td >US Patent Granted</td>
                </tr>
                <tr style={{ textAlign: 'center' }}>
                    <td >2</td>
                    <td >System And Method For Capturing Horizontal Disparity Stereo Panorama</td>
                    <td >CVIT</td>
                    <td >Prof. Anoop Namboodiri, Mr. Rajat Agarwal, Amrisha Vohra</td>
                    <td >US10154249B2 Application US15/627,224</td>
                    <td >US Patent Granted</td>
                </tr>
                <tr style={{ textAlign: 'center'}}>
                    <td >3</td>
                    <td >System And Method For Capturing Horizontal Disparity Stereo Panorama</td>
                    <td >CVIT</td>
                    <td >Prof. Anoop Namboodiri, Mr. Rajat Agarwal, Amrisha Vohra</td>
                    <td >US Patent Granted</td>
                </tr>
                <tr style={{ textAlign: 'center' }}>
                    <td >4</td>
                    <td >System And Method For Capturing Horizontal Disparity Stereo Panorama</td>
                    <td >CVIT</td>
                    <td >Prof. Anoop Namboodiri, Mr. Rajat Agarwal, Amrisha Vohra</td>
                    <td >US10154249B2 Application US15/627,224</td>
                    <td >US Patent Granted</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DynamicTable;
