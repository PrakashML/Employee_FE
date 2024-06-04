import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';



const EmployeeList = ({count}) => {
    const navigate = useNavigate();

    const handleAddEmployeeClick = () => {
        navigate('/form');
    };

  return (
    <>

    <div className='d-flex justify-content-between align-items-center mb-4'>  
        <div className='d-flex flex-column justify-content-start'>
            <h3 className="mb-1 text-left">Employees</h3>
            <h6 className="mb-0 text-muted">Complete list of all employees</h6>
        </div>
                
        <Button variant="primary" style={{ borderRadius: '15px', display: 'flex', alignItems: 'center' }} onClick={handleAddEmployeeClick}> <FaUserPlus style={{ marginRight: '5px' }} /> Add employee</Button>
    </div>

    <Row className="mb-4">
        <Col md={4}>
            <Card className="d-flex flex-row text-center align-items-center" style={{ backgroundColor: '#e9f1f8', borderRadius: '20px' }}>
                <Card.Body className="align-items-center">
                    <Card.Title>Total employees</Card.Title>
                    <Card.Text>{count}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card className="text-center" style={{ backgroundColor: '#e9f1f8', borderRadius: '20px' }}>
                <Card.Body>
                    <Card.Title>Active employees</Card.Title>
                    <Card.Text>{count}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card className="text-center" style={{ backgroundColor: '#e9f1f8', borderRadius: '20px' }}>
                <Card.Body>
                    <Card.Title>Yearly goal</Card.Title>
                    <Card.Text>45%</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    </>
                    
  )
}

export default EmployeeList