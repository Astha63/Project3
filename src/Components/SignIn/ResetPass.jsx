import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ResetPass.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from './AuthContext';

function ResetPass() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { updateRegistData, setUsername } = useContext(AuthContext); 

    const handleSendClick = async (event) => {
        event.preventDefault()
        console.log(email)

        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/forget-password', {
                username: email
            });
        console.log('Reset instructions sent:', response.data);
            setUsername(email);

            
            navigate("/Otp");
        } catch (error) {
            console.error('Error sending reset instructions:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <>
            <div className='ResetPass'>
                <div className='Rectangle1' />
                <div className='Rectangle2' />
                <div className='Rectangle3' />
                <div className='TitleContainer'>
                    <h1 className='Title'>
                        AI-Based Knowledge <br /> Discovery Platform
                    </h1>
                </div> 

                <div className='FormContainer5'>
                    <form className='Form3' onSubmit={handleSendClick}>
                        <h2 className='FormTitle3'>Reset Password</h2>
                        <p className='Description'>
                            Enter your username, We will send reset instructions to the associated email address.
                        </p>
                        <input
                            className='FormInput3'
                            type='text'
                            placeholder='Enter your username'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <button className='FormButton3 SignInButton'>
                            Send
                        </button>
                        <p className='SignUpPrompt3'>
                            Go back to the {' '}
                            <span>
                                <Link to='/'>Sign In </Link>
                            </span>
                            page
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPass;
