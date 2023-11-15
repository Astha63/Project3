import React, { useContext, useState } from 'react';
import DateP from './DateP';
import './DocPage2.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function DocPage2() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [medicalDegree, setMedicalDegree] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [affiliation, setAffiliation] = useState('');

    const handleSpecializationChange = (e) => {
        setSpecialization(e.target.value);
    };

    const handleMedicalDegreeChange = (e) => {
        setMedicalDegree(e.target.value);
    };

    const handleLicenseNumberChange = (e) => {
        setLicenseNumber(e.target.value);
    };

    const handleAffiliationChange = (e) => {
        setAffiliation(e.target.value);
    };

    const handleDateChange = (date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setLicenseExpiryDate(formattedDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                specialization,
                medicalDegree: medicalDegree,
                medicalLicenseNo: licenseNumber,
                licenseExpiryDate: licenseExpiryDate,
                affiliation,
                ...authContext.registData
            };
            authContext.updateRegistData(data); // updates the registration data stored in the context

            console.log('Stored Registration Data:', data);
            navigate("/DocPage3");
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

   
    return (
        <>
            <div className='DocRes'>
                <div className='Rectangle Rectangle1' />
                <div className='Rectangle Rectangle2' />
                <div className='Rectangle Rectangle3' />
                <div className='TitleContainer'>
                    <h1 className='Title'>
                        AI-Based Knowledge <br /> Discovery Platform
                    </h1>
                </div>
                <div className='DocPage'>
                    <form className='Form' onSubmit={handleSubmit}>
                        <h2 className='FormTitle'>Doctor Registration</h2>
                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Enter your specialization'
                            required
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                        />
                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Medical Degree e.g. MBBS'
                            required
                            value={medicalDegree}
                            onChange={(e) => setMedicalDegree(e.target.value)}
                        />
                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Medical License Number'
                            required
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                        />
                        <div className='DateP'>
                            <DateP placeholder="License Expiry Date" onChange={handleDateChange} />


                        </div>

                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Medical affiliation'
                            required
                            value={affiliation}
                            onChange={(e) => setAffiliation(e.target.value)}
                        />
                        <div className="button-group">
                            <button className="button4" type="submit" onClick={() => navigate(`/DocRes/Doctor`)}>
                                Previous
                            </button>
                            <button className="button5" type="submit">
                                Next
                            </button>
                        </div>
                    </form>


                   
                </div>
            </div>
        </>
    )
}
export default DocPage2;