import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './NewPass.css';
import './SignIn.css';

function NewPass() {
    const [password, setPassword] = useState('');
    const [resetStatus, setResetStatus] = useState('');
    const { username, resetToken } = useContext(AuthContext); 

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        
        const resetData = {
            username: username,
            new_password: password, 
            reset_token: resetToken,
        };

        console.log(resetData)
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/reset-password', resetData);
          
        } catch (error) {
            console.error('Error resetting password:', error);
            setResetStatus('Password reset error');
        }
    };

    return (
        <div className='NewPass'>
            <div className='Rectangle1' />
            <div className='Rectangle2' />
            <div className='Rectangle3' />
            <div className='TitleContainer'>
                <h1 className='Title'>
                    AI-Based Knowledge <br /> Discovery Platform
                </h1>
            </div>

            <div className='FormContainer5'>
                <form className='Form5'>
                    <h2 className='FormTitle5'>Set New Password</h2>
                    <input
                        className='FormInput5'
                        type='text'
                        placeholder='Enter your Username'
                        value={username}
                        readOnly 
                        required
                    />
                    <input
                        className='FormInput5'
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div>
                        <button className='FormButton5 B4' onClick={handlePasswordReset}>
                            Save
                        </button>
                    </div>
                    <div className='SignUpPrompt5'>
                        <p>
                            Go back to the{' '}
                            <span>
                                <Link to='/'>Sign In</Link>
                            </span>{' '}
                            page
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPass;
