import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterP1.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { usePatientContext } from './PatientContext';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

function RegisterP2() {
  const { updatePatientData } = usePatientContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [district, setDistrict] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const handleCountryChange = (value) => {
    setCountry(value);
    setState('');
  };

  const handleRegionChange = (value) => {
    setState(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email,
      addressLine1,
      addressLine2,
      district,
      country,
      state,
      city,
      pincode,
    };

    updatePatientData(formData);
    console.log('Form data submitted:', formData);
    navigate('/RegisterP3');
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
        <Link to="/RegisterP" className='BackButton'>
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
              type='email'
              placeholder='Enter email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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

export default RegisterP2;
