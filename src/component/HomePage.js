import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './SideBar';
import EmployeeTable from './EmployeeTable';
import Header from './Header';

const HomePage = () => {
  return (
    <div style={{backgroundColor: '#e9f1f8'}}>
    <Container fluid>
      <Row>
        <Col xs={2}>
        <Sidebar/>
        </Col>
        <Col xs={10}>
          <Header/>
          <EmployeeTable/>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default HomePage