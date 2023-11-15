import React, { useState } from 'react';
import Dob from '../DocPages/Dob';
import PhoneN from '../SignIn/PhoneN';
import './RegisterP1.css';
import { useNavigate } from 'react-router-dom';
import { usePatientContext } from './PatientContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; // Import the home icon

function RegisterP() {
    const [fullName, setFullName] = useState('');
    const [maritialStatus, setMaritialStatus] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [gender, setSelectedGender] = useState('');
    const [dob, setSelectedDate] = useState('');
    const { updatePatientData } = usePatientContext();
    const [dobError, setDobError] = useState('');
    const [fullNameError, setFullNameError] = useState('');  


    const navigate = useNavigate();

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

        setSelectedDate(date);

        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setSelectedDate(formattedDate);
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };
    const handleMaritalStatusChange = (event) => {
        setMaritialStatus(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let hasError = false;

        // Check if DOB is in the future or today
        if (dobError.trim() !== '') {
            hasError = true;
        }

        // Check full name for valid characters
        if (!fullName.match(/^[A-Za-z\s\.,-]*$/)) {
            setFullNameError('Full name should not contain numbers and should only allow (., -) as special characters');
            hasError = true;
        } else {
            setFullNameError('');
        }

        if (!hasError) {
            // If no errors, proceed with the navigation and data update
            const formData = {
                fullName,
                maritialStatus,
                phoneNumber: `+${phoneNumber}`,
                emergencyContact: `+${emergencyContact}`,
                gender,
                dob,
            };
            console.log(formData);

            updatePatientData(formData);
            console.log('Form Data:', formData);
            navigate('/RegisterP2');
        }
    };

    return (
        <>
            <div className='RP1'>
                <div className='Rectangle Rectangle1' />
                <div className='Rectangle Rectangle2' />
                <div className='Rectangle Rectangle3' />
                <div className='DocT'>
                    <img
                        src="https://www.bmj.com/careers/getasset/338855e0-f1e7-45bd-88a7-8859e4d33655/"
                        alt="Doc Face"
                        style={{ width: '400px', height: '240px' }}
                    />
                </div>
                <div className='RPage1'>
                    <form className='FormRP' onSubmit={handleSubmit}>
                        <h2 className='FormTitleRP'>Patient Registration</h2>

                        <button className='HomeButton' onClick={() => navigate("/DashB")}>
                            <FontAwesomeIcon icon={faHome} />
                        </button>

                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Patient Full Name'
                            required
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                        <div>
                            <div className='DateR'>
                                <Dob placeholder="Date Of Birth" onChange={handleDateChange} />
                            </div>

                            <select
                                className={`FormInputRP ${gender ? 'selected-option' : 'placeholder'}`}
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <option value='' className='placeholder'>
                                    Select Gender
                                </option>
                                <option value='Male'>
                                    Male
                                </option>
                                <option value='Female'>
                                    Female
                                </option>
                                <option value='Other'>
                                    Other
                                </option>
                            </select>

                        </div>

                        <div>
                            <select
                                className={`FormInputRP ${maritialStatus ? 'selected-option' : 'placeholder'}`}
                                value={maritialStatus}
                                onChange={handleMaritalStatusChange}
                            >
                                <option value='' className='placeholder'>
                                    Select Marital Status
                                </option>
                                <option value='Unmarried'>
                                    Unmarried
                                </option>
                                <option value='Married'>
                                    Married
                                </option>
                                <option value='Divorced'>
                                    Divorced
                                </option>
                                <option value='Widowed'>
                                    Widowed
                                </option>
                            </select>

                        </div>

                        <div className='phone1'>
                            <PhoneN
                                placeholder="Enter phone number"
                                onChange={(formattedValue) => setPhoneNumber(formattedValue)}
                            />
                        </div>
                        <div className='phone2'>
                            <PhoneN
                                placeholder="Enter Emergency Contact number"
                                onChange={(formattedValue) => setEmergencyContact(formattedValue)}
                            />
                        </div>
                        {dobError && <div className="error-message">{dobError}</div>}
                        {fullNameError && <div className="error-message">{fullNameError}</div>}

                        <button className='FormButton B6' type='submit'>
                            Next
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default RegisterP;
