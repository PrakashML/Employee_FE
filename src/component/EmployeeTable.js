import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Card } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import employeeService from '../service/EmployeeService';
import '../App.css';

const EmployeesList = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState('');

    const handleAddEmployeeClick = () => {
        navigate('/form');
    };

    const handleActionButton = (id) => {
        navigate(`/update/${id}`);
    };

    useEffect(() => {
        employeeService.getAllEmployees().then(response => {
            setEmployees(response.data);
            console.log(response.data);
            setStatus('Active')
        }).catch(error => {
            console.error('There was an error fetching the employees!', error);
        });
    }, []);

    return (
        <Container fluid>
            <Row className="my-4">
                <Col className='p-4' style={{ backgroundColor: 'white', borderRadius: '20px' }}>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        
                        <div className='d-flex flex-column justify-content-start'>
                        <h3 className="mb-1 text-left">Employees</h3>
                            <h6 className="mb-0 text-muted">Complete list of all employees</h6>
                        </div>
                           
                        
                        <Button
                            variant="primary"
                            style={{ borderRadius: '15px', display: 'flex', alignItems: 'center' }}
                            onClick={handleAddEmployeeClick}
                        >
                            <FaUserPlus style={{ marginRight: '5px' }} /> Add employee
                        </Button>
                    </div>
                    <Row className="mb-4">
                        <Col md={4}>
                            <Card className="d-flex flex-row text-center align-items-center" style={{ backgroundColor: '#e9f1f8', borderRadius: '20px' }}>
                                <Card.Body className="align-items-center">
                                    <Card.Title>Total employees</Card.Title>
                                    <Card.Text>{employees.length}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="text-center" style={{ backgroundColor: '#e9f1f8', borderRadius: '20px' }}>
                                <Card.Body>
                                    <Card.Title>Active employees</Card.Title>
                                    <Card.Text>{employees.filter(emp => emp.status === 'Active').length}</Card.Text>
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
                    <div className="custom-table mt-3">
                        <div className="custom-thead">
                            <Row className="header-row">
                                <Col>ID</Col>
                                <Col>Name</Col>
                                <Col>Role</Col>
                                <Col>Phone no / Email</Col>
                                <Col>Project</Col>
                                <Col>Status</Col>
                                <Col>Action</Col>
                            </Row>
                        </div>
                        <div className="custom-tbody">
                            {employees.map(emp => (
                                <Row className="body-row" key={emp.id}>
                                    <Col>{emp.id}</Col>
                                    <Col>{emp.name}</Col>
                                    <Col>{emp.jobTitle}</Col>
                                    <Col>{emp.phoneNumber} <br /> {emp.email}</Col>
                                    <Col>NHS</Col>
                                    <Col><Badge bg={emp.status === 'Active' ? 'secondary' : 'success'}>{status}</Badge></Col>
                                    <Col>
                                        <Button
                                            style={{ backgroundColor: '#e9f1f8', color: 'black' }}
                                            onClick={() => handleActionButton(emp.id)}
                                        >
                                            ...
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeesList;
