import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import employeeService from '../service/EmployeeService';
import '../App.css';
import EmployeeList from './EmployeeList';
import * as wjcGrid from '@mescius/wijmo.react.grid';
import * as wijmo from '@mescius/wijmo';
import '@mescius/wijmo.styles/wijmo.css';
import { FlexGridFilter } from '@mescius/wijmo.react.grid.filter';

const EmployeesTable = () => {
    // const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState('');
    const [count, setCount] = useState(0);
    // const [data, setData] = React.useState();

    // const handleActionButton = (id) => {
    //     navigate(`/update/${id}`);
    // };

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

    const [filter, setFilter] = React.useState('');
  const view = React.useMemo(() => new wijmo.CollectionView(), []);
  const [counter, setCounter] = React.useState(view.items.length);

  const updateFilter = React.useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const filterView = React.useCallback((filterText) => {
    filterText = filterText.toLowerCase();
    view.filter = (item) => {
      return filterText
        ? item.country.toLowerCase().includes(filterText)
        : true;
    };
    setCounter(view.items.length);
  }, [view]);

  React.useEffect(() => {
    wijmo.httpRequest('http://localhost:8080/payroll/employees', {
      data: {
        $format: 'json',
      },
      success: (xhr) => {
        // got the data, assign it to the CollectionView
        let response = JSON.parse(xhr.response);
        let data = response.d ? response.d.results : response;

        // Transform data to include only required fields
        let filteredData = data.map(item => ({
          id: item.id,
          name: item.name,
          jobTitle: item.jobTitle,
          phoneNumber: item.phoneNumber,
          country: item.country
        }));

        // use the result as the sourceCollection
        view.sourceCollection = filteredData;
        setCounter(filteredData.length);

        // Add sort description
        let sd = new wijmo.SortDescription("country", true);
        view.sortDescriptions.push(sd);
      },
      error: (xhr) => {
        console.error('HttpRequest Error:', xhr.status, xhr.statusText);
      }
    });
  }, [view]);

  React.useEffect(() => {
    filterView(filter);
  }, [filter, filterView]);


    return (
        <Container fluid>
            <Row className="my-4">
                <Col className='p-4' style={{ backgroundColor: 'white', borderRadius: '20px' }}>
                    <EmployeeList count={count}/>
                    <div className="d-flex f-column align-items-start">
                        <div className="d-flex f-column align-items-start w-100 mb-20">
                        <input className="form-control w-300 mb-20" placeholder="country filter" value={filter} onChange={updateFilter} />
                        </div>
                    </div>

                    <p className='d-flex mt-3'>
                        Result ({counter} items):
                    </p>
                    <div className="custom-table mt-3">
                        <div className="custom-thead">
                            <wjcGrid.FlexGrid alternatingRowStep={0} headersVisibility="Column" itemsSource={view}>
                                <wjcGrid.FlexGridColumn header="ID" binding="id" width={100} />
                                <wjcGrid.FlexGridColumn header="Name" binding="name" width={200}/>
                                <wjcGrid.FlexGridColumn header="Job Title" binding="jobTitle" width={300}/>
                                <wjcGrid.FlexGridColumn header="Phone Number" binding="phoneNumber" width={150}/>
                                <wjcGrid.FlexGridColumn header="Country" binding="country" width={150}/>
                                <wjcGrid.FlexGridColumn header="Actions" width={93}/>
                                <FlexGridFilter />
                            </wjcGrid.FlexGrid>
                        </div>
                    </div>
                    </Col>
            </Row>
        </Container>
        
    );
};

export default EmployeesTable;