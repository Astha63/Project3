import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import './DateP.css';

const DateP = ({ onChange, placeholder }) => {
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
                placeholderText={placeholder} // Use the placeholder prop here
                className="date-picker"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
            />
            <FaCalendarAlt className="calendar-icon" />
        </div>
    );
};

export default DateP;
