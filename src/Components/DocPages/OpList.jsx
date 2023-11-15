import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OperationCard from './OperationCard';
import './OpList.css'; 
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

function OpList() {
  const [operations, setOperations] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch operation data from the API
    axios.get('http://127.0.0.1:8000/doctor/operation-notes')
      .then((response) => {
        setOperations(response.data);
        console.log('Fetched operations data:', response.data); // Log the received data

      })
      .catch((error) => {
        console.error('Error fetching operation data:', error);
      });
  }, []);

  const toggleDetails = (operationID) => {
    setDetailsVisible((prevDetailsVisible) => ({
      ...prevDetailsVisible,
      [operationID]: !prevDetailsVisible[operationID],
    }));
  };

  return (
    <>
      <SideBar />
     
      <div className='FormTitleOL'>
        <button className='FormButton OpL' onClick={() => navigate("/OperationalN")}>
          Create a new note
        </button>
        <h2>Operation List</h2>
        <div className="operation-list">
        {operations.map((operation) => (
          <OperationCard
            key={operation.ID}
            operation={operation}
            showDetails={detailsVisible[operation.ID]}
            toggleDetails={toggleDetails}
          />
        ))}
       
      </div>
      </div>
    </>
  );
}

export default OpList;
