import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { RiHomeLine } from "react-icons/ri";
import { FiInbox } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { RxPerson } from "react-icons/rx";
import { BsFileBarGraph, BsFolder } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Sidebar = () => {
  const [isPeopleExpanded, setIsPeopleExpanded] = useState(false);

  const handlePeopleClick = () => {
    setIsPeopleExpanded(!isPeopleExpanded);
  };

  return (
    <Nav className="flex-column sidebar p-3 pt-7" style={{ height: '100vh', width: '70%', backgroundColor: '#e9f1f8' }}>
      <Nav.Item className='d-flex align-items-center mb-3'>
        <RiHomeLine className='me-2' size={20} />
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }}>Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item className='d-flex align-items-center mb-3'>
        <FiInbox className='me-2' size={20} />
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }}>Inbox</Nav.Link>
      </Nav.Item>
      <Nav.Item className='d-flex align-items-center mb-3'>
        <GoBell className='me-2' size={20} />
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }}>Activity</Nav.Link>
      </Nav.Item>
      <Nav.Item className='d-flex align-items-center justify-content-between mb-3'>
        <div className='d-flex'>
        <RxPerson className='me-2' size={20} />
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }} onClick={handlePeopleClick}>People</Nav.Link>
        </div>
        <div>
        {isPeopleExpanded ? <FiChevronUp className='ms-5' /> : <FiChevronDown className='ms-5' />}
        </div>      
      </Nav.Item>
      {isPeopleExpanded && (
        <>
          <Nav.Item className='d-flex align-items-center mb-3 ms-4'>
            <Nav.Link href="#" className=" pr-10" style={{ color: '#1a254e', backgroundColor: 'white', borderRadius: '8px' }}>Employees</Nav.Link>
          </Nav.Item>
          <Nav.Item className='d-flex align-items-center mb-3 ms-4'>
            <Nav.Link href="#" className="p-1" style={{ color: '#1a254e' }}>Clients</Nav.Link>
          </Nav.Item>
        </>
      )}
      <Nav.Item className='d-flex align-items-center mb-3'>
        <BsFileBarGraph className='me-2' size={20}/>
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }}>Statistics</Nav.Link>
      </Nav.Item>

      <Nav.Item className='d-flex align-items-center mb-3'>
        <Nav.Link href="#" className="p-0" style={{ color: '#b5c4cc' }}>Folders</Nav.Link>
      </Nav.Item>
      <Nav.Item className='d-flex align-items-center mb-3'>
        <BsFolder className='me-2' size={20}/>
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }}>My Documents</Nav.Link>
      </Nav.Item>
      <Nav.Item className='d-flex align-items-center mb-3'>
        <BsFolder className='me-2' size={20}/>
        <Nav.Link href="#" className="p-0" style={{ color: '#1a254e' }}>Shared Documents</Nav.Link>
      </Nav.Item>
      
    </Nav>
  );
};

export default Sidebar;
