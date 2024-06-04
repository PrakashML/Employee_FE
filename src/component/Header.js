import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FiInbox } from "react-icons/fi";
import { GoBell } from "react-icons/go";

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <Container fluid className="pt-3" style={{ backgroundColor: '#e9f1f8' }}>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Nav activeKey={activeTab} onSelect={handleSelect}>
            <Nav.Item className="me-4"> {/* Added margin to the right */}
              <Nav.Link 
                eventKey="home" 
                style={{ 
                  color: '#1a254e', 
                  backgroundColor: activeTab === 'home' ? 'white' : '#e9f1f8', 
                  borderRadius: '10px',
                  padding: '10px 20px' 
                }}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="me-4"> {/* Added margin to the right */}
              <Nav.Link 
                eventKey="settings" 
                style={{ 
                  color: '#1a254e', 
                  backgroundColor: activeTab === 'settings' ? 'white' : '#e9f1f8', 
                  borderRadius: '10px',
                  padding: '10px 20px' 
                }}
              >
                Settings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="get-help" 
                style={{ 
                  color: '#1a254e', 
                  backgroundColor: activeTab === 'get-help' ? 'white' : '#e9f1f8', 
                  borderRadius: '10px',
                  padding: '10px 20px' 
                }}
              >
                Get Help
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <FiInbox className="me-3" size={20} />
          <GoBell className="me-3" size={20} />
          <img src='./images/ProfMen.png' alt='profmen' style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
