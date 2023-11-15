import React, { useState, useContext } from 'react';
import DateP from './DateP';
import PhoneN from './PhoneN';
import './DocRes.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function DocRes() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [selectedGender, setSelectedGender] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setdob] = useState('');  
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dobError, setDobError] = useState('');
    const [fullNameError, setFullNameError] = useState('');  




    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
        authContext.updateRegistData({ ...authContext.registData, gender });
    };
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDateChange = (date) => {
        const selectedDate = new Date(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day

        if (selectedDate > currentDate) {
            setDobError('Date of birth cannot be in the future or today');
        } else {
            setDobError('');

            if (selectedDate.toDateString() === currentDate.toDateString()) {
                // If the selected date is today, you can handle it as you need, for example, display an error message.
                setDobError('Date of birth cannot be today');
            }
        }

        setdob(date);

        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setdob(formattedDate);
    };


    const handlePhoneChange = (phoneNumber) => {
        setPhoneNumber(`+${phoneNumber}`);
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;

        if (!fullName.match(/^[A-Za-z\s\.,-]*$/)) {
            setFullNameError('Full name should not contain numbers and should only allow (., -) as special characters');
            hasError = true;
        } else {
            setFullNameError('');
        }

        if (dobError.trim() !== '') {
            hasError = true;
        }

        if (!hasError) {
            authContext.updateRegistData({
                ...authContext.registData,
                fullName: fullName,
                email,
                dob,
                phoneNumber: phoneNumber,
            });

            console.log({
                fullName: fullName,
                email,
                dob,
                phoneNumber: phoneNumber,
                gender: authContext.registData.gender,
            });

            navigate('/DocPage1');
        }
    };



    return (
        <>
            <div className='DocRes'>
                <div className='Rectangle Rectangle1' />
                <div className='Rectangle Rectangle2' />
                <div className='Rectangle Rectangle3' />
                <div className='TitleContainer2'>
                    <h1 className='Title2'>
                        AI-Based Knowledge <br /> Discovery Platform
                    </h1>
                </div>
                <div className='DocPage'>
                    <form className='Form2' onSubmit={handleSubmit}>
                        <h2 className='FormTitle2'>Doctor Registration</h2>
                        

                        <input
                            className='FormInput2'
                            type='text'
                            placeholder='Enter your full name'
                            required
                            value={fullName}
                            onChange={handleFullNameChange}
                        />
                        <input
                            className='FormInput2'
                            type='email'
                            placeholder='Enter your email'
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className='DateP
                        
                        '>
                            <DateP placeholder="Date Of Birth" onChange={handleDateChange} />
                        </div>
                        <div>
                            <PhoneN placeholder="Enter your Phone Number" onChange={handlePhoneChange} />

                        </div>

                        <div className="button-group">
                            <button
                                className={`button1 ${selectedGender === 'Male' ? 'selected' : ''}`}
                                onClick={() => handleGenderClick('Male')}
                                type="button"
                            >
                                Male
                            </button>
                            <button
                                className={`button2 ${selectedGender === 'Female' ? 'selected' : ''}`}
                                onClick={() => handleGenderClick('Female')}
                                type="button"
                            >
                                Female
                            </button>
                            <button
                                className={`button3 ${selectedGender === 'Other' ? 'selected' : ''}`}
                                onClick={() => handleGenderClick('Other')}
                                type="button"
                            >
                                Other
                            </button>
                        </div>
                        {dobError && <div className="error-message">{dobError}</div>}
                        {fullNameError && <div className="error-message">{fullNameError}</div>}
                        <button className='FormButton B3' type='submit'>
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default DocRes;
