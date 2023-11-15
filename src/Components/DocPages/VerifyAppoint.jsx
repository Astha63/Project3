import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppointmentContext } from './AppointmentContext';
import ChatImage from './Img/Chat.png';
import Otpp from './Otpp';
import './RegisterP1.css';
import './VerifyAppoint.css';
import SideBar from './SideBar';

function VerifyAppoint() {
    const [enteredOtp, setEnteredOtp] = useState('');
    const navigate = useNavigate();
    const { appointmentId, patientId } = useAppointmentContext();

    const handleOtpChange = (enteredOtp) => {
        setEnteredOtp(enteredOtp);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            otp: enteredOtp,
            appointment_id: appointmentId, 
            patient_id: patientId,         
        };

        console.log(formData);
        console.log('VerifyAppoint - appointmentId:', appointmentId);
        console.log('VerifyAppoint - patientId:', patientId);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/doctor/verify-appointment',
                formData
            );

            console.log('Verification Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
            <SideBar></SideBar>
            <div className='VA'>
                <form className='FormVA' onSubmit={handleSubmit}>
                    <h2 className='FormTitleVA'>Verify Appointment</h2>
                    <Otpp onOtpChange={handleOtpChange} />
                    <button className='FormButton BVA' type='submit'>
                        Verify
                    </button>
                </form>
            </div>
        </>
    );
}

export default VerifyAppoint;
