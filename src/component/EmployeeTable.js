import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import employeeService from '../service/EmployeeService';
import '../App.css';
import EmployeeList from './EmployeeList';
import * as wjcGrid from '@mescius/wijmo.react.grid';
import * as wijmo from '@mescius/wijmo';
import '@mescius/wijmo.styles/wijmo.css';
import { FlexGridFilter } from '@mescius/wijmo.react.grid.filter';

const EmployeesTable = () => {
    
    const [filter, setFilter] = useState('');
    const view = useMemo(() => new wijmo.CollectionView(), []);
    const [counter, setCounter] = useState(view.items.length);

    const fetchFilteredData = useCallback((filterText) => {
        employeeService.getAllEmployees(filterText)
            .then(response => {
                const filteredData = response.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    jobTitle: item.jobTitle,
                    phoneNumber: item.phoneNumber,
                    country: item.country
                }));
                view.sourceCollection = filteredData;
                setCounter(filteredData.length);
            })
            .catch(error => {
                console.error('Error fetching filtered employees!', error);
            });
    }, [view]);

    useEffect(() => {
        fetchFilteredData('');
    }, [fetchFilteredData]);

    const updateFilter = useCallback((e) => {
        const filterText = e.target.value.toLowerCase();
        setFilter(filterText);
        fetchFilteredData(filterText);
    }, [fetchFilteredData]);

    return (
        <Container fluid>
            <Row className="my-2">
                <Col className='p-4' style={{ backgroundColor: 'white', borderRadius: '20px' }}>
                    <EmployeeList count={counter}/>
                    <div className="d-flex f-column align-items-start">
                        <div className="d-flex f-column align-items-start w-100 mb-20">
                            <input
                                className="form-control w-300 mb-20"
                                placeholder="country filter"
                                value={filter}
                                onChange={updateFilter}
                            />
                        </div>
                    </div>

                    <p className='d-flex mt-3'>
                        Result ({counter} items):
                    </p>
                    <div className="custom-table mt-3">
                        <div className="custom-thead">
                            <wjcGrid.FlexGrid
                                alternatingRowStep={0}
                                headersVisibility="Column"
                                itemsSource={view}
                            >
                                <wjcGrid.FlexGridColumn header="ID" binding="id" width={100} />
                                <wjcGrid.FlexGridColumn header="Name" binding="name" width={200}/>
                                <wjcGrid.FlexGridColumn header="Job Title" binding="jobTitle" width={300}/>
                                <wjcGrid.FlexGridColumn header="Phone Number" binding="phoneNumber" width={150}/>
                                <wjcGrid.FlexGridColumn header="Country" binding="country" width={150}/>
                                <wjcGrid.FlexGridColumn header="Actions" width={93}/> 

                                <FlexGridFilter/>
                            </wjcGrid.FlexGrid>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeesTable;
