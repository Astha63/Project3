import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppointmentContext } from './AppointmentContext';
import Datee from '../DocPages/Datee';
import TimePicker from '@ashwinthomas/react-time-picker-dropdown';
import SideBar from './SideBar';

function ScheduleApp() {
    const [value, onChange] = useState('10:00');
    const [doctorList, setDoctorList] = useState([]);
    const [doctor_id, setDoctorId] = useState('');
    const [date_of_appointment, setAppointmentDate] = useState('');
    const [time_slot, setTimeSlot] = useState('');
    const [department, setDepartment] = useState('');
    const [healthcare_provider, setHealthcare_provider] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [medical_history, setMedicalHistory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [patientList, setPatientList] = useState([]);
    const navigate = useNavigate();
    const { addAppointment, setAppointmentId, setPatientId } = useAppointmentContext();

    const timePickerClassName = 'custom-time-picker';

    const handleDoctorIdChange = (event) => {
        setDoctorId(event.target.value);
    };

    const handleAppointmentDateChange = (selectedDate) => {
        const dateObject = new Date(selectedDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setAppointmentDate(formattedDate);
    };

    const handleTimeSlotChange = (time_slot) => {
        const formattedTimeSlot = time_slot.replace(/\s+/g, '').replace(/[AaPp][Mm]/g, '');
        setTimeSlot(formattedTimeSlot);
    };

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleHealthcare_providerChange = (event) => {
        setHealthcare_provider(event.target.value);
    };

    const handleSymptomsChange = (event) => {
        setSymptoms(event.target.value);
    };

    const handleMedicalHistoryChange = (event) => {
        setMedicalHistory(event.target.value);
    };

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/doctor/all-patients')
            .then((response) => {
                setIsLoading(false);
                setPatientList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching patients:', error);
                setIsLoading(false);
            });

        axios
            .get('http://127.0.0.1:8000/admin/all-doctors')
            .then((response) => {
                setIsLoading(false);
                setDoctorList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching doctors:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            patient_id: parseInt(selectedPatientId),
            doctor_id: parseInt(doctor_id),
            date_of_appointment,
            time_slot,
            department,
            healthcare_provider,
            symptoms,
            medical_history,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/doctor/schedule-appointment', formData);
            const { appointment_id, patient_id } = response.data;

            addAppointment(response.data);
            setAppointmentId(appointment_id);
            setPatientId(patient_id);

            navigate('/VerifyAppoint');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <SideBar />
            <div className='RPSA'>
                <div className='RPageSA'>
                    <form className='FormSA' onSubmit={handleSubmit}>
                        <h2 className='FormTitleSA'>Schedule Appointment</h2>
                        <select
                            className='FormInputSA'
                            value={selectedPatientId}
                            onChange={(event) => setSelectedPatientId(event.target.value)}
                            style={{ color: selectedPatientId ? 'black' : '#999' }}
                            required
                        >
                            <option value="">Select patient ID</option>
                            {isLoading ? (
                                <option>Loading...</option>
                            ) : (
                                patientList.map((patient, index) => (
                                    <option
                                        key={index}
                                        value={patient.patients.patient_id}
                                    >
                                        {patient.patients.full_name}
                                    </option>
                                ))
                            )}
                        </select>

                        <select
                            className='FormInputSA'
                            value={doctor_id}
                            onChange={(event) => setDoctorId(event.target.value)}
                            style={{ color: doctor_id ? 'black' : '#999' }}
                            required
                        >
                            <option value="">Select Attending Doctor ID</option>
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

                        <div className="date-time-containerr">
                            <Datee placeholder="Appointment Date" onChange={handleAppointmentDateChange} />
                            <TimePicker
                                defaultValue={value}
                                useTwelveHourFormat={true}
                                onTimeChange={handleTimeSlotChange}
                                placeholder="Appointment Time"
                                style={{ border: '2px solid #e9e1e1' }}
                            />
                        </div>

                        <input
                            type='text'
                            className='FormInputSA'
                            placeholder='Enter Department'
                            required
                            value={department}
                            onChange={handleDepartmentChange}
                        />

                        <input
                            className='FormInputSA'
                            type='text'
                            placeholder='Enter Health Care Provider'
                            required
                            value={healthcare_provider}
                            onChange={handleHealthcare_providerChange}
                        />

                        <input
                            className='FormInputSA'
                            type='text'
                            placeholder='Enter Symptoms'
                            required
                            value={symptoms}
                            onChange={handleSymptomsChange}
                        />

                        <input
                            className='FormInputSA'
                            type='text'
                            placeholder='Enter Medical History'
                            required
                            value={medical_history}
                            onChange={handleMedicalHistoryChange}
                        />

                        <button className='FormButton BB' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ScheduleApp;
