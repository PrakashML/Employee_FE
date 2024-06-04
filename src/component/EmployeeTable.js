import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import employeeService from '../service/EmployeeService';
import '../App.css';
import EmployeeList from './EmployeeList';
import * as wjcGrid from '@mescius/wijmo.react.grid';

const EmployeesTable = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState('');
    const [count, setCount] = useState(0);
    const [data, setData] = React.useState();

    const handleActionButton = (id) => {
        navigate(`/update/${id}`);
    };

    useEffect(() => {
        employeeService.getAllEmployees().then(response => {
            setEmployees(response.data);
            console.log(response.data);
            setCount(response.data.length);
            setStatus('Active')
        }).catch(error => {
            console.error('There was an error fetching the employees!', error);
        });
    }, []);

    return (
        <Container fluid>
            <Row className="my-4">
                <Col className='p-4' style={{ backgroundColor: 'white', borderRadius: '20px' }}>
                    <EmployeeList count={count}/>
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

export default EmployeesTable;