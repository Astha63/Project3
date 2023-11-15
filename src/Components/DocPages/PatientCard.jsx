
import React, { useState } from 'react';
import './PatientI.css';

function PatientCard({ name, fullName, details }) {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const toggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    return (
        <>
            <div className={`patient-card ${isDetailsVisible ? 'open' : ''}`} onClick={toggleDetails}>
                <div className="patient-info">
                    <h3>Patients Name: {name}</h3>
                    <h3 className="patient-id">Patient ID: {details.patient_id}</h3>
                    <button onClick={toggleDetails}>More Info</button>
                </div>
            </div>
                {isDetailsVisible && (
                <div className="details-popup-background">
                    <div className="details-popup">
                        <h4>Patient Details</h4>
                        <p>Abha Number: {details.abha_number}</p>
                        <p>Gender: {details.gender}</p>
                        <p>Emergency Contact: {details.emergency_contact}</p>
                        <p>Marital Status: {details.marital_status}</p>
                        <p>Medical History: {details.medical_history}</p>
                        <p>Phone Number: {details.phone_number}</p>
                        <p>Primary Care Provider: {details.primary_care_provider}</p>
                        <p>Email: {details.email}</p>
                        <p>Preferred Language: {details.preferred_language}</p>
                        <p>Nationality: {details.nationality}</p>
                        <p>Occupation: {details.occupation}</p>
                        <p>Created At: {details.created_at}</p>
                        <p >Patient ID: {details.patient_id}</p> 
                        <button onClick={toggleDetails}>Close</button>
                    </div>
                </div>
                    
                )}
           
        </>
    );
}

export default PatientCard;