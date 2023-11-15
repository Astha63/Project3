import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterP1.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faHome } from '@fortawesome/free-solid-svg-icons';
import { usePatientContext } from './PatientContext';
import axios from 'axios';

function RegisterP3() {
    const [nationality, setNationality] = useState('');
    const [occupation, setOccupation] = useState('');
    const [abhaNumber, setAadharNumber] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('');
    const [primaryCareProvider, setPrimaryCareProvider] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');

    const { patientData } = usePatientContext();
    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
      
        if (abhaNumber.length !== 14 || !/^\d+$/.test(abhaNumber)) {
            alert('Abha Number must be exactly 14 digits');
            return; 
        }

        const formData = {
            nationality,
            occupation,
            abhaNumber,
            preferredLanguage,
            primaryCareProvider,
            medicalHistory,
            ...patientData 
        };
console.log(formData)
        try {
            const response = await axios.post('http://127.0.0.1:8000/common/register-patient', formData);
            console.log('Form data submitted:', response.data);
        } catch (error) {
            console.error('Error submitting form data:', error);
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
                <Link to="/RegisterP2" className='BackButton'>
                    <FontAwesomeIcon icon={faArrowLeft} className="BackIcon" /> Back
                </Link>


                <div className='RPage1'>
                    <form className='FormRP' onSubmit={handleFormSubmit}>
                        <h2 className='FormTitleRP'>Patient Registration</h2>
                        <button className='HomeButton' onClick={() => navigate("/DashB")}>
                            <FontAwesomeIcon icon={faHome} />
                        </button>
                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Nationality'
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            required
                        />
                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Occupation'
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                        />

                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Abha Number'
                            value={abhaNumber}
                            onChange={(e) => setAadharNumber(e.target.value)}
                            required
                        />

                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Preferred Language'
                            value={preferredLanguage}
                            onChange={(e) => setPreferredLanguage(e.target.value)}
                            required
                        />

                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Primary Care Provider'
                            value={primaryCareProvider}
                            onChange={(e) => setPrimaryCareProvider(e.target.value)}
                            required
                        />

                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Medical History'
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                            required
                        />

                        <button className='FormButton B6' type='submit'>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterP3;