import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

function Do() {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

    const handleCountryChange = (value) => {
        setCountry(value);
        setRegion('');
    };

    const handleRegionChange = (value) => {
        setRegion(value);
    };

    return (
        <div>
            <h2>Location Selector</h2>
            <div>
                <label>Country:</label>
                <CountryDropdown
                    value={country}
                    onChange={handleCountryChange}
                />
            </div>
            <div>
                <label>State/Region:</label>
                <RegionDropdown
                    country={country}
                    value={region}
                    onChange={handleRegionChange}
                />
            </div>
        </div>
    );
}

export default Do;
