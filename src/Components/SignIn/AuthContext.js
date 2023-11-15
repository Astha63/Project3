import React, { useState, createContext, useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || '');
    const [password, setPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [registData, setRegistData] = useState({
        fullName: '',
        email: '',
        gender: '',
        dob: '',
        phoneNumber: '',
        role: '',
    });

    useEffect(() => {
        try {
            console.log('useEffect in AuthContext.js is triggered!');

            const storedToken = localStorage.getItem('access_token');

            console.log('Stored token:', storedToken);

            if (storedToken) {
                setAccessToken(storedToken);
            }
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }, []); // Empty dependency array to run only once during component mount

    const resetUserData = () => {
        setUsername('');
        setPassword('');
        setRegistData({
            fullName: '',
            email: '',
            gender: '',
            dob: '',
            phoneNumber: '',
            role: '',
        });
        setResetToken('');
    };

    const login = (token, enteredUsername) => {
        setAccessToken(token);
        setUsername(enteredUsername);
        localStorage.setItem('access_token', token);
        localStorage.setItem('username', enteredUsername); // Store the username in local storage

        console.log('User logged in. Access token stored in local storage.');
    };

    const logout = () => {
        setUsername('');
        setAccessToken('');
        setPassword('');
        localStorage.removeItem('username'); // Remove the username from local storage

        localStorage.removeItem('access_token');
        console.log('User logged out. Access token removed from local storage.');
    };

    const updatePassword = (value) => {
        setPassword(value);
    };

    const updateRegistData = (data) => {
        setRegistData((prevData) => ({
            ...prevData,
            ...data,
            username,
            password,
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                username,
                setUsername,
                updatePassword,
                registData,
                updateRegistData,
                resetToken,
                setResetToken,
                login,
                logout,
                accessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
