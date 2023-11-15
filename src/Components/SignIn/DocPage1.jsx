import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


function DocPage1() {
  
  
    const navigate = useNavigate();
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');

    const authContext = useContext(AuthContext);

    const handleCountryChange = (value) => {
        setCountry(value);
        setState('');
    };

    const handleRegionChange = (value) => {
        setState(value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
            addressLine1,
            addressLine2,
            district,
            country,
            state,
            city,
            pincode,
            ...authContext.registData
        };

        authContext.updateRegistData(data); // updates the registration data stored in the context

        console.log('Stored Registration Data:', data);
        navigate("/DocPage2");
    } catch (error) {
        console.error('An error occurred', error);
    }
};

    return (
        <>
            <div className='RP1'>
                <div className='Rectangle Rectangle1' />
                <div className='Rectangle Rectangle2' />
                <div className='Rectangle Rectangle3' />
                <div className='TitleContainer'>
                    <h1 className='Title'>
                        AI-Based Knowledge <br /> Discovery Platform
                    </h1>
                </div>
                <div className='RPage1'>
                    <form className='FormRP' onSubmit={handleFormSubmit}>
                        <h2 className='FormTitleRP'>Doctor Registration</h2>

                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Address Line 1'
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            required
                        />
                        <input
                            className='FormInputRP'
                            type='text'
                            placeholder='Enter Address Line 2'
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            required
                        />
                        <div className="location-selector">
                            <div className="location-fields-container">
                                <div className="location-field1">
                                    <CountryDropdown
                                        value={country}
                                        onChange={handleCountryChange}
                                        placeholder="Select country"

                                        className="CountryDropdown"
                                    />
                                </div>
                            </div>
                            <div className="input-fields-container">
                                <div className="location-field2">
                                    <RegionDropdown
                                        country={country}
                                        value={state}
                                        onChange={handleRegionChange}
                                        showDefaultOption={true}
                                        blankOptionLabel="Select state"

                                        className="RegionDropdown"
                                    />
                                </div>
                                <input
                                    className='In1'
                                    type='text'
                                    placeholder='Enter City'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-fields-container">
                            <input
                                className='In2'
                                type='text'
                                placeholder='Enter District'
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                            <input
                                className='In2'
                                type='text'
                                placeholder='Enter Pincode'
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                            />
                        </div>
                        <button className='FormButton B6' type='submit'>
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default DocPage1;
