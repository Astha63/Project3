import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import DateP from '../SignIn/DateP.css';


const Dob = ({ onChange, placeholder }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="date-picker-container">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    onChange(date);
                }}
                dateFormat="dd-MM-yyyy"
                placeholderText={placeholder}
                className="date-pickerr2"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
            />
            <FaCalendarAlt className="calendar-iconn" />
        </div>
    );
};

export default Dob;
