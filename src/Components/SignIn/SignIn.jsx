import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './SignIn.css';
import { GoogleLogin } from 'react-google-login';

function SignIn() {
    const navigate = useNavigate();
    const { login, accessToken } = useContext(AuthContext);

    const [googleSignInAttempted, setGoogleSignInAttempted] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleLoginSuccess = (response) => {
        console.log('Google login successful', response);
    };

    const handleGoogleLoginFailure = (error) => {
        if (error.error === 'popup_closed_by_user') {
            console.log('User closed the sign-in popup.');
        } else {
            console.error('Google login failed', error);
        }
    };

    const retryGoogleSignIn = () => {
        setGoogleSignInAttempted(true);
    };

    const handleSignInClick = async (e) => {
        e.preventDefault();

        // Check username format
        if (/^[a-zA-Z][a-zA-Z\s]*$/.test(username)) {
            // Check password format
            if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)) {
                try {
                    const formData = new FormData();
                    formData.append('username', username);
                    formData.append('password', password);

                    const response = await axios.post('http://127.0.0.1:8000/auth/token', formData);
                    console.log('SignIn response:', response);

                    const accessToken = response.data.access_token;

                    localStorage.setItem('access_token', accessToken);


                    login(accessToken, username);

                    if (accessToken) {
                        navigate('/DashB', { replace: true });
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                setErrorMessage(
                    'Password must contain at least 8 characters with one uppercase letter, one number, and one special character'
                );
            }
        } else {
            setErrorMessage('Username must start with a letter and not contain special characters, numbers, or spaces');
        }
    };

    const handleSignInWithGoogleClick = (e) => {
        e.preventDefault();
        console.log('Sign in with Google button clicked!');
    };

    return (
        <div className='SignIn'>
            <div className='Rectangle1' />
            <div className=' Rectangle2' />
            <div className=' Rectangle3' />

            <div className='TitleContainer'>
                <h1 className='Title'>
                    AI-Based Knowledge <br /> Discovery Platform
                </h1>
            </div>
            <div className='FormContainer'>
                <form className='Form' onSubmit={handleSignInClick}>
                    <h2 className='FormTitle'>Welcome Back</h2>
                    <input
                        className='FormInput'
                        type='text'
                        placeholder='Enter your Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        className='FormInput'
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className='FormFooter'>
                        <div className='RememberMe'>
                            <input type='checkbox' />
                            <p>Remember me?</p>
                        </div>
                        <Link className='ForgotPassword' to='/ResetPass'>
                            Forgot Password
                        </Link>
                    </div>
                    <button className='FormButton SignInButton' type='submit' onClick={handleSignInClick}>
                        Sign In
                    </button>
                    {errorMessage && <div className='error-message'>{errorMessage}</div>}

                    <GoogleLogin
                        clientId='1098245097294-0dmju8849hahfstujub17k9h5q9hj907.apps.googleusercontent.com'
                        buttonText='Sign in with Google'
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        className='google-login-button'
                    />
                    {googleSignInAttempted && (
                        <p>
                            Sign-in with Google was canceled by the user. <button onClick={retryGoogleSignIn}>Retry</button>
                        </p>
                    )}
                    <p className='SignUpPrompt' onClick={() => navigate('/SignUp')}>
                        Don't have an account? <span>{<Link to='/SignUp'>Sign Up</Link>}</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
