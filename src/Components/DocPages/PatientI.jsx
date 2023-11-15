import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard';
import axios from 'axios';
import './PatientI.css';
import SideBar from './SideBar';

function PatientI() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/doctor/all-patients');
        setPatients(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching patient data');
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <SideBar />
      <div className="patient-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          patients.map((patient) => (
            <PatientCard
              key={patient.patients.patient_id}
              name={patient.patients.full_name}
              fullName={patient.patients.full_name} // Pass the full name to the "fullName" prop
              details={patient.patients}
            />
          ))
        )}

      </div>

    </>
  );
}

export default PatientI;