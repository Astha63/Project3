import React, { useState, useRef, useEffect } from 'react';
import Otp from '../SignIn/Otp.css';

const Otpp = ({ onOtpChange }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [completeOtp, setCompleteOtp] = useState('');

    const inputRefs = Array(6).fill(null).map(() => React.createRef());

    const handleChange = (index, event) => {
        const newValue = event.target.value;

        if (newValue === '' && index > 0) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = newValue;
                return newOtp;
            });

            inputRefs[index - 1].current.focus();
        } else if (newValue !== '' && index < 5) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = newValue;
                return newOtp;
            });

            inputRefs[index + 1].current.focus();
        } else if (newValue !== '') {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = newValue;
                return newOtp;
            });

            otp.pop();
            const notp = [...otp, newValue];

            if (index === 5) {
                const fullOtp = notp.join('');
                console.log("OTP")
                console.log(fullOtp)
                onOtpChange(fullOtp);
            }
        } else if (newValue === '' && index === 0) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = newValue;
                return newOtp;
            });
        }
    };

    useEffect(() => {
        if (completeOtp.length === 6) {
            onOtpChange(completeOtp);
        }
    }, [completeOtp, onOtpChange]);

    return (
        <div className="otp-container">
            {inputRefs.map((inputRef, index) => (
                <input
                    key={`input-${index}`}
                    ref={inputRef}
                    className="otp-input"
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e)}
                    autoFocus={index === 0}
                />
            ))}
            {completeOtp.length === 6 && (
                <div className="entered-otp">
                    Entered OTP: {completeOtp}
                </div>
            )}
        </div>
    );
};

export default Otpp;
