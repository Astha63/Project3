

import React, { useState, useContext } from 'react';
import Verify from './Verify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Otp.css';
import { AuthContext } from './AuthContext';

function Otp() {
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const { registData, setResetToken, username } = useContext(AuthContext);

    const handleVerification = async (otp) => {
        console.log(otp)
        console.log(enteredOtp)
        const otpData = {
            username: username, 
            otp: enteredOtp,
        };

        console.log(otpData)

        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/verify-otp', otpData);
          
            console.log(response.data.reset_token)
            setResetToken(response.data.reset_token);

                 navigate('/NewPass');
    
            
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setVerificationStatus('Verification error');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();


        console.log('Entered OTP before verification:', enteredOtp);
       
        handleVerification(enteredOtp);
    };

    const handleOtpChange = (enteredOtp) => {
        setEnteredOtp(enteredOtp);
    };


    return (
        <div>
            <div className='Otp'>
                <div className='Rectangle1' />
                <div className='Rectangle2' />
                <div className='Rectangle3' />
                <div className='TitleContainer'>
                    <h1 className='Title'>
                        AI-Based Knowledge <br /> Discovery Platform
                    </h1>
                </div>
                <div className='FormContainer4'>
                    <form className='Form4' onSubmit={handleFormSubmit}>
                        <h2 className='FormTitle4'>Verify Otp</h2>
                        <p className='Description2'>
                            Please enter OTP sent to your registered email - example@info.com
                        </p>
                        <div className="app-container">
                            <Verify onOtpChange={handleOtpChange} />
                        </div>

                        <button className='FormButton4 B3' type="submit">
                            Verify
                        </button>
                        <p className='SignUpPrompt4'>
                            Already have an account{' '}
                            <span>
                                <Link to='/'>Sign In</Link>
                            </span>
                
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Otp;
