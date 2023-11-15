import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatImage from './Img/Chat.png';
import Datee from '../DocPages/Datee';
import TimePicker from '@ashwinthomas/react-time-picker-dropdown';
import axios from 'axios'; 
import SideBar from './SideBar';
import "./RescheduleAppoint.css";

function RescheduleAppoint() {
    const navigate = useNavigate();
    const [value, onChange] = useState('10:00');

    const [appointment_id, setAppointmentId] = useState('');
    const [new_date, setNew_date] = useState('');
    const [new_time_slot, setNewTimeSlot] = useState('');

    const handleNew_dateChange = (date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setNew_date(formattedDate);
    };

    const handleNewTimeChange = (time) => {
        const formattedTime = time.replace(/\s+/g, '').toLowerCase();

        setNewTimeSlot(formattedTime);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            appointment_id,
            new_date,
            new_time_slot,
        };

        console.log('Form Data:', formData);
        

        try {
            const response = await axios.post('http://127.0.0.1:8000/doctor/reschedule-appointment', formData);

                navigate("/VerifyReschedule");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <SideBar/>
        <div className='RRe'>
            <form className='FormRe' onSubmit={handleSubmit}>
                <h2 className='FormTitleRe'>Reschedule Appointment</h2>
                <input
                    className='FormInputRe'
                    type='text'
                    placeholder='Enter Appointment-id'
                    required
                    value={appointment_id}
                    onChange={(e) => setAppointmentId(e.target.value)}
                />

                <div className="date-time-containerRe">
                    <Datee placeholder="Appointment Date" onChange={handleNew_dateChange} />
                    <TimePicker
                        defaultValue={value}
                        useTwelveHourFormat={true}
                        onTimeChange={handleNewTimeChange}
                        placeholder="Appointment Time"
                        style={{ border: '2px solid #e9e1e1' }} 
                        type="button"
                    />
                </div>

                <button className='FormButton BRe' type='submit'>
                    Submit
                </button>
            </form>
            </div>
       </>
    );
}

export default RescheduleAppoint;
