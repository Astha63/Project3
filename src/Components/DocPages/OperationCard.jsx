import React, { useState } from 'react';
import './OperationalIN.css';

function OperationCard({ operation, showDetails, toggleDetails }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const hidePopup = () => {
        setIsPopupVisible(false);
    };
  
    return (
        <div className='card-container'>
            <div className='card'>
                <div className="card-content">
                    <div className="patient-info">
                        <p>Surgeon Name: {operation.surgical_team.surgeon_name}</p>
                        <p>Patient ID: {operation.operation_notes.patient_id}</p>
                     
                    </div>
                    <button onClick={showPopup}>More Info</button>
                </div>
            </div>
           

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        

                        <h2>Patient Details :</h2>

                        <p>Operation Date: {operation.operation_notes.operation_date}</p>
                        <p>Procedure Performed: {operation.operation_notes.procedure_performed}</p>
                        <p>Indication: {operation.operation_notes.indication}</p>
                        <p>Preoperative Diagnosis: {operation.operation_notes.preoperative_diagnosis}</p>
                        <p>Interoperative Findings: {operation.operation_notes.interoperative_findings}</p>
                        <p>Surgical Technique: {operation.operation_notes.surgical_technique}</p>
                        <p>Instruments and Equipment: {operation.operation_notes.instruments_and_equipment}</p>
                        <p>Duration: {operation.operation_notes.duration}</p>
                        <p>Postoperative Diagnosis: {operation.operation_notes.postoperative_diagnosis}</p>
                        <p>Postoperative Management: {operation.operation_notes.postoperative_management}</p>
                        <p>Assistant Surgeon: {operation.surgical_team.assistant_surgeon}</p>
                        <p>Anesthesiologist: {operation.surgical_team.anesthesiologist}</p>
                        <p>Operating Room Staff: {operation.surgical_team.operating_room_staff}</p>
                        <button className="close-buttonn" onClick={hidePopup}>Close</button>
                    </div>
                </div>
               
            )}
        </div>
    );
}

export default OperationCard;
