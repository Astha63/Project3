import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatImage from './Img/Chat.png';
import Datee from '../DocPages/Datee';
import TimePicker from '@ashwinthomas/react-time-picker-dropdown';
import './BookAppoint.css';
import { useAppointmentContext } from './AppointmentContext';
import SideBar from './SideBar';

function BookAppoint() {
  const [doctorList, setDoctorList] = useState([]);
  const [nurseList, setNurseList] = useState([]);
  const [value, onChange] = useState('10:00');
  const [admission_date, setSelectedDate] = useState('');
  const [admission_time, setAdmissionTime] = useState('');
  const [room_number, setRoomNo] = useState('');
  const [bed_number, setBedNo] = useState('');
  const [attending_doctor_id, setAttendingDoctorId] = useState('');
  const [assigned_nurse_id, setAssignedNurseId] = useState(''); // Fixed typo here
  const [patientList, setPatientList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const timePickerClassName = 'custom-time-picker';

  const handleDateChange = (selectedDate) => {
    const dateObject = new Date(selectedDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(formattedDate);
  };

  const handleTimeChange = (newTime) => {
    const formattedTime = newTime.replace(/\s+/g, '').replace(/[AaPp][Mm]/g, '');

    setAdmissionTime(formattedTime);
  };

  const navigate = useNavigate();
  const { addAppointment } = useAppointmentContext();
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/doctor/all-patients')
      .then((response) => {
        setIsLoading(false);
        setPatientList(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
        setIsLoading(false);
      });

    axios
      .get('http://127.0.0.1:8000/doctor/all-doctors')
      .then((response) => {
        setIsLoading(false);
        setDoctorList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });

    axios
      .get('http://127.0.0.1:8000/doctor/all-nurses')
      .then((response) => {
        setIsLoading(false);
        setNurseList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching nurses:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      patient_id: selectedPatientId,
      admission_date,
      admission_time,
      room_number,
      bed_number,
      attending_doctor_id,
      assigned_nurse_id,
    };

    console.log(formData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/common/ipd', formData);
      addAppointment(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <SideBar />
      <div className='RPSA'>
        <div className='RPageSA'>
          <form className='FormSA' onSubmit={handleSubmit}>
            <h2 className='FormTitleSA'>Book Appointment</h2>

            <select
              className={`FormInputSA ${selectedPatientId ? 'selected-option' : 'placeholder'}`}
              value={selectedPatientId}
              onChange={(event) => setSelectedPatientId(event.target.value)}
              style={{ color: selectedPatientId ? 'black' : '#999' }}
            >
              <option value="" className="placeholder">
                Select patient ID
              </option>
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                patientList.map((patient, index) => (
                  <option
                    key={index}
                    value={patient.patients.patient_id}
                  >
                    {patient.patients. full_name}
                  </option>
                ))
              )}
            </select>

            <div className="date-time-containerr">
              <div className='DateTS'>
                <Datee placeholder="Appointment Date" onChange={handleDateChange} />
              </div>
              <TimePicker
                defaultValue={value}
                useTwelveHourFormat={true}
                onTimeChange={handleTimeChange}
                placeholder="Appointment Time"
                style={{ border: '2px solid #e9e1e1' }}
              />
            </div>
            <div className="input-fields-containerr">
              <input
                type='text'
                className='In3'
                placeholder='Enter Room No'
                required
                value={room_number}
                onChange={(event) => setRoomNo(event.target.value)}
              />

              <input
                className='In4'
                type='text'
                placeholder='Enter Bed No'
                required
                value={bed_number}
                onChange={(event) => setBedNo(event.target.value)}
              />
            </div>
            <select
              className={`FormInputSA ${attending_doctor_id ? 'selected-option' : 'placeholder'}`}
              value={attending_doctor_id}
              onChange={(event) => setAttendingDoctorId(event.target.value)}
              style={{ color: attending_doctor_id ? 'black' : '#999' }}
            >
              <option value="" className="placeholder">
                Select Attending Doctor ID
              </option>
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                doctorList.map((doctor, index) => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.full_name}
                  </option>
                ))
              )}
            </select>

          <select
            className={`FormInputSA ${assigned_nurse_id ? 'selected-option' : 'placeholder'}`}
            value={assigned_nurse_id}
            onChange={(event) => setAssignedNurseId(event.target.value)}
            style={{ color: assigned_nurse_id ? 'black' : '#999' }}
          >
            <option value="" className="placeholder">
              Select Assigned Nurse ID
            </option>
            {isLoading ? (
              <option>Loading...</option>
            ) : (
              nurseList.map((nurse, index) => (
                <option
                  key={nurse.id}
                  value={nurse.id}
                >
                  {nurse.full_name}
                </option>
              ))
            )}
          </select>
          <button className='FormButton BA' type='submit'>
            Submit
          </button>
        </form>
        </div>
        </div>
    </>
  );
}

export default BookAppoint;
