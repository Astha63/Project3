import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientContext } from './PatientContext';
import "./DashB.css";
import ChatImage from './Img/Chat.png';
import './RegisterP1.css';
import Otpp from './Otpp';
import './VerifyAppoint.css';
import SideBar from './SideBar';


function VerifyReschedule() {
    const [enteredOtp, setEnteredOtp] = useState('');
    const handleOtpChange = (enteredOtp) => {
        setEnteredOtp(enteredOtp);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate("/CancelAppoint");
    };
  return (
 <>
<SideBar/>
            <form className='FormVA' onSubmit={handleSubmit}>
                <h2 className='FormTitleVA'>Verify Reschedule</h2>
                <Otpp onOtpChange={handleOtpChange} />
                <button className='FormButton BVA' type='submit'>
                    Verify
                </button>
            </form>

        </>
    )
}

export default VerifyReschedule;