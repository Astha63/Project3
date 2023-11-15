import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientContext } from './PatientContext';
import "./DashB.css";
import ChatImage from './Img/Chat.png';
import './RegisterP1.css';
import SideBar from './SideBar';

function CancelAppoint() {
    const navigate = useNavigate();
    const [appointmentId, setAppointmentId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 

      
        navigate("/VerifyCancel"); 
    };

    return (
        <>
            <SideBar/>
            <div className='RRe'>
                <form className='FormRe' onSubmit={handleSubmit}>

                    <h2 className='FormTitleRe'>Cancel Appointment</h2>
                    <input
                        className='FormInputRe'
                        type='text'
                        placeholder='Enter Appointment-id'
                        required
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                    />
                    <button className='FormButton BRe' type='submit'>
                        Submit
                    </button>
                </form>
            </div>
          

        </>

    )
}

export default CancelAppoint;
