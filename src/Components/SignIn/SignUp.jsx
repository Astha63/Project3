import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './SignUp.css';

function SignUp() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (!selectedRole) {
            console.log("Please select a role");
            return;
        }

        const usernamePattern = /^[A-Za-z][A-Za-z0-9_]*$/;
        if (!usernamePattern.test(username)) {
            setUsernameError("Username is invalid");
            return;
        }

        // Validate password
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            setPasswordError("Password is invalid");
            return;
        }

        authContext.updateUsername(username);
        authContext.updatePassword(password);

        console.log('Username:', username);
        console.log('Password:', password);
        console.log('role:', selectedRole);

        navigateAfterSignUp();
    };

    const navigateAfterSignUp = () => {
        if (selectedRole === 'DOCTOR') {
            navigate(`/DocRes/${selectedRole}`);
        } else if (selectedRole === 'NURSE') {
            navigate(`/NurseRes/${selectedRole}`);
        } else if (selectedRole === 'DATAENTRYOPERATOR') {
            navigate(`/DataEntryRes/${selectedRole}`);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRoleSelection = (role) => {
        setSelectedRole(role.toUpperCase());
        authContext.updateRegistData({ role: role.toUpperCase() });
    };

    return (
        <div className='SignUp'>
            <div className='Rectangle1' />
            <div className='Rectangle2' />
            <div className='Rectangle3' />
            <div className='TitleContainer2'>
                <h1 className='Title2'>
                    AI-Based Knowledge <br /> Discovery Platform
                </h1>
            </div>
            <div className='FormContainer2'>
                <form className='Form2' onSubmit={handleSignUpSubmit}>
                    <h2 className='FormTitle2'>Get Started</h2>
                    <p className='TextP'>Create your account now</p>
                    <input
                        className='FormInput2'
                        type='text'
                        placeholder='Enter your Username'
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    <input
                        className='FormInput2'
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        className='FormInput2'
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <div className='button-group1'>
                        <button
                            className={`buttonD ${selectedRole === 'Doctor' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelection('Doctor')}
                            type="button"
                        >
                            Doctor
                        </button>
                        <button
                            className={`buttonN ${selectedRole === 'Nurse' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelection('Nurse')}
                            type="button"
                        >
                            Nurse
                        </button>
                        <button
                            className={`buttonDE ${selectedRole === 'DataEntryOperator' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelection('DataEntryOperator')}
                            type="button"
                        >
                            Data Entry Operator
                        </button>
                    </div>
                    <div>
                        <button type='submit' className='FormButton B2'>
                            Sign Up
                        </button>
                        {usernameError && <p className='error'>{usernameError}</p>}
                        {passwordError && <p className='error'>{passwordError}</p>}
                    </div>
                    <div>
                        <p className='SignUpPrompt2'>
                            Already have an account{' '}
                            <span>
                                <Link to='/'>Sign In</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
