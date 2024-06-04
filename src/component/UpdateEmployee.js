import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Nav, ToggleButton, ToggleButtonGroup, Col, Alert, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import MaleImage from '../component/images/black-male-image.png';
import employeeService from '../service/EmployeeService';
import FemaleImage from '../component/images/white-female-image.png';

const AddEmployeeForm = () => {
  const [key, setKey] = useState('basic');
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const initialFormData = {
    id: '',
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

  useEffect(() => {
    if (id) {
      employeeService.getEmployee(id).then(response => {
        setFormData(response.data);
      }).catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
    }
  }, [id]);

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
      setShowModal(true);
    }
  };

  const handleSaveChanges = async () => {
    setShowModal(false);
    try {
      const response = await employeeService.updateEmployee(id, formData);
      console.log('Form submitted:', response.data);
      setShowAlert(true); // Show success alert
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error('There was an error updating the employee!', error);
    }
  };

  const handleDeleteEmployee = async () => {
    setShowDeleteModal(false);
    try {
      await employeeService.deleteEmployee(id);
      navigate('/');
    } catch (error) {
      console.error('There was an error deleting the employee!', error);
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
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
              </svg>
              <h4>Manage Employee</h4>
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
                Employee has been updated successfully!
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
                      {formData.gender === 'Male' && <img src={MaleImage} alt="male" height={40} width={40}/>}
                      {formData.gender === 'Female' && <img src={FemaleImage} alt="female" height={40} width={40}/>}
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
                  <div className="d-flex justify-content-between">
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
                  <Form.Group controlId="deleteButton" className="mb-3 d-flex flex-row justify-content-between">
                    {key === 'benefits' && <Button className="btn btn-danger mt-3" onClick={() => setShowDeleteModal(true)}>Delete Employee</Button>}
                  </Form.Group>
                </>
              )}
              <div className="d-flex justify-content-between">
                <div>
                <Button variant="secondary" onClick={handlePrevious}>
                  Previous
                </Button>
                </div>
                <div>
                {key === 'basic' && <Button variant="primary" type="submit">Next</Button>}
                {key === 'employment' && <Button variant="primary" type="submit">Next</Button>}
                {key === 'benefits' && <Button variant="success" type="submit">Save Changes</Button>}
                </div>
                </div>
            </Form>
          </Card.Body>
        </Card>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Save Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to save these changes?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </Col>
    </Container>
  );
};

export default AddEmployeeForm;
