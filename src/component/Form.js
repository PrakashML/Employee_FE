import React, { useState } from 'react';
import { Container, Card, Form, Button, Nav, ToggleButton, ToggleButtonGroup, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import employeeService from '../service/EmployeeService';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import MaleImage from '../component/images/black-male-image.png';
import FemaleImage from '../component/images/white-female-image.png';


const AddEmployeeForm = () => {
  const [key, setKey] = useState('basic');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const initialFormData = {
    id: '', // Assuming you have an id field for updating
    name: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    country: '',
    gender: '',
    employmentType: '',
    joinDate: '',
    hoursPerWeek: '',
    salary: '',
    taxReductions: '',
    healthInsurance: false,
    gymMembership: false,
    dentalAndVisionCare: false,
    washingAllowance: false,
    employeeAssistanceProgram: false,
    lifeInsuranceRetirementPlans: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleEmploymentTypeChange = (value) => {
    setFormData({ ...formData, employmentType: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tabs = ['basic', 'employment', 'benefits'];
    const currentIndex = tabs.indexOf(key);
    if (currentIndex < tabs.length - 1) {
      setKey(tabs[currentIndex + 1]);
    } else {
      try {
        const response = await employeeService.addEmployee(formData);
        console.log('Form submitted:', response.data);
        setShowAlert(true); // Show success alert
        setFormData(initialFormData); // Reset the form data to initial values
        setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
      } catch (error) {
        console.error('There was an error adding the employee!', error);
      }
    }
  };

  const handlePrevious = () => {
    const tabs = ['basic', 'employment', 'benefits'];
    const currentIndex = tabs.indexOf(key);
    if (currentIndex > 0) {
      setKey(tabs[currentIndex - 1]);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Col xs={6}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="d-flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
              </svg>
              <h4>...Add Employee</h4>
            </div>
            <Button onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="20"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </Button>
          </Card.Header>
          <Card.Body>
            {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                Employee has been added successfully!
              </Alert>
            )}
            <Nav variant="underline" activeKey={key} onSelect={(k) => setKey(k)}>
              <Nav.Item>
                <Nav.Link eventKey="basic">Basic Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="employment">Employment Type</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="benefits">Benefits</Nav.Link>
              </Nav.Item>
            </Nav>
            <Form onSubmit={handleSubmit} className="mt-3">
              {key === 'basic' && (
                <>
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="jobTitle" className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="phoneNumber" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="country" className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <div className='d-flex justify-content-between'>
                      <div>
                      <Button
                        variant={formData.gender === 'Male' ? 'primary' : 'outline-primary'}
                        onClick={() => handleGenderChange('Male')}
                        className="me-2"
                      >
                        Male
                      </Button>
                      <Button
                        variant={formData.gender === 'Female' ? 'primary' : 'outline-primary'}
                        onClick={() => handleGenderChange('Female')}
                        className="me-2"
                      >
                        Female
                      </Button>
                      <Button
                        variant={formData.gender === 'Other' ? 'primary' : 'outline-primary'}
                        onClick={() => handleGenderChange('Other')}
                      >
                        Other
                      </Button>
                      </div>

                      <div>
                      {formData.gender === 'Male' && <img src={MaleImage} alt="male" height={30} width={30}/>}
                      {formData.gender === 'Female' && <img src={FemaleImage} alt="female" height={30} width={30}/>}
                      </div>
                    </div>
                  </Form.Group>
                </>
              )}
              {key === 'employment' && (
                <>
                  <Form.Group controlId="employmentType" className="mb-3 d-flex justify-content-center">
                    <ToggleButtonGroup
                      type="radio"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleEmploymentTypeChange}
                      className="w-100"
                    >
                      <ToggleButton id="full-time" value="Full-Time">
                        Full-Time
                      </ToggleButton>
                      <ToggleButton id="part-time" value="Part-Time">
                        Part-Time
                      </ToggleButton>
                      <ToggleButton id="contract" value="Contract">
                        Contract
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Form.Group>
                  <div className="d-flex flex-row justify-content-between">
                    <Form.Group controlId="joinDate" className="mb-3 me-2">
                      <Form.Label>Join Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="hoursPerWeek" className="mb-3">
                      <Form.Label>Hours/Week</Form.Label>
                      <Form.Control
                        type="text"
                        name="hoursPerWeek"
                        value={formData.hoursPerWeek}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <Form.Group controlId="salary" className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="taxReductions" className="mb-3">
                    <Form.Label>Tax Reductions</Form.Label>
                    <Form.Control
                      type="text"
                      name="taxReductions"
                      value={formData.taxReductions}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}
              {key === 'benefits' && (
                <>
                  <Form.Group controlId="healthInsurance" className="mb-3 d-flex flex-row justify-content-between">
                    <Form.Label>Health Insurance</Form.Label>
                    <Form.Check
                      type="switch"
                      id="healthInsurance"
                      name="healthInsurance"
                      checked={formData.healthInsurance}
                      onChange={handleSwitchChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="gymMembership" className="mb-3 d-flex flex-row justify-content-between">
                    <Form.Label>Gym Membership</Form.Label>
                    <Form.Check
                      type="switch"
                      id="gymMembership"
                      name="gymMembership"
                      checked={formData.gymMembership}
                      onChange={handleSwitchChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="dentalAndVisionCare" className="mb-3 d-flex flex-row justify-content-between">
                    <Form.Label>Dental And Vision Care (DVC)</Form.Label>
                    <Form.Check
                      type="switch"
                      id="dentalAndVisionCare"
                      name="dentalAndVisionCare"
                      checked={formData.dentalAndVisionCare}
                      onChange={handleSwitchChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="washingAllowance" className="mb-3 d-flex flex-row justify-content-between">
                    <Form.Label>Washing Allowance</Form.Label>
                    <Form.Check
                      type="switch"
                      id="washingAllowance"
                      name="washingAllowance"
                      checked={formData.washingAllowance}
                      onChange={handleSwitchChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="employeeAssistanceProgram" className="mb-3 d-flex flex-row justify-content-between">
                    <Form.Label>Employee Assistance Program (EAP)</Form.Label>
                    <Form.Check
                      type="switch"
                      id="employeeAssistanceProgram"
                      name="employeeAssistanceProgram"
                      checked={formData.employeeAssistanceProgram}
                      onChange={handleSwitchChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="lifeInsuranceRetirementPlans" className="mb-3 d-flex flex-row justify-content-between">
                    <Form.Label>Life Insurance And Retirement Plans</Form.Label>
                    <Form.Check
                      type="switch"
                      id="lifeInsuranceRetirementPlans"
                      name="lifeInsuranceRetirementPlans"
                      checked={formData.lifeInsuranceRetirementPlans}
                      onChange={handleSwitchChange}
                    />
                  </Form.Group>
                </>
              )}
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handlePrevious}>
                  Previous
                </Button>
                {key === 'basic' && <Button variant="primary" type="submit">Next</Button>}
                {key === 'employment' && <Button variant="primary" type="submit">Next</Button>}
                {key === 'benefits' && <Button variant="success" type="submit">Submit</Button>}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default AddEmployeeForm;
