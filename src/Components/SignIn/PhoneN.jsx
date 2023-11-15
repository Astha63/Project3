// import React, { useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// function PhoneN({ onChange, placeholder }) {
//     const [phoneInputValue, setPhoneInputValue] = useState('');

//     const phoneInputStyles = {
//         width: '420px',
//         height: '40px',
//         fontSize: '14px',
//     };

//     const handlePhoneInputChange = (value, country, event, formattedValue) => {
//         setPhoneInputValue(value);
//         onChange(formattedValue);
//     };

//     return (
//         <div>
//             <PhoneInput
//                 country={'in'}
//                 value={phoneInputValue || ''} 
//                 onChange={handlePhoneInputChange}
//                 inputStyle={phoneInputStyles}
//                 inputProps={{
//                     name: 'phone',
//                     required: true,
//                     placeholder: placeholder, 
//                 }}
//             />
//         </div>
//     );
// }

// export default PhoneN;
// PhoneN.js
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Otp.css';

function PhoneN({ onChange, placeholder }) {
    const [phoneInputValue, setPhoneInputValue] = useState('');
    const [showPhoneInput, setShowPhoneInput] = useState(false);

    const phoneInputStyles = {
        width: '420px',
        height: '40px',
        fontSize: '14px',
    };

    const handlePhoneInputChange = (value) => {
        // Removes all non-digit characters
        const cleanedValue = value.replace(/[^0-9]/g, '');

        // Add the plus sign and country code (e.g., +91)
        const formattedValue = `+${cleanedValue}`;

        setPhoneInputValue(formattedValue);
        onChange(cleanedValue);

        // Show the PhoneInput component after the user starts entering a value
        setShowPhoneInput(true);
    };

    return (
        <div>
            {showPhoneInput ? (
                <PhoneInput
                    country={'in'}
                    value={phoneInputValue}
                    onChange={handlePhoneInputChange}
                    inputStyle={phoneInputStyles}
                    inputProps={{
                        name: 'phone',
                        required: true,
                        placeholder: placeholder,
                        enableSearch: false,
                        disableSearchIcon: false,
                    }}
                />
            ) : (
                <input
                    className='FormInput'
                    type='tel'
                    placeholder={placeholder}
                    required
                    value={phoneInputValue}
                    onChange={(e) => handlePhoneInputChange(e.target.value)}
                />
            )}
        </div>
    );
}

export default PhoneN;

