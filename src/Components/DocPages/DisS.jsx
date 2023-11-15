import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DisS.css';
import Dateee from '../DocPages/Dateee';
import SideBar from './SideBar';

function DisS() {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    admission_date_time: '',
    diagnosis: '',
    medical_history: '',
    procedure_performed: '',
    medications: '',
    vital_signs: '',
    laboratory_results: '',
    imaging_results: '',
    consultation: '',
    progress_note: '',
    discharge_plan: '',
    summary: '',
    recommendations: '',
  });
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [doctor_id, setDoctorId] = useState('');

  const [doctorList, setDoctorList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAppointmentDateChange = (selectedDate) => {
    setFormData({
      ...formData,
      admission_date_time: selectedDate,
    });
  };

  const handleTimeSlotChange = (newTime) => {
    setFormData({
      ...formData,
      admission_date_time: newTime,
    });
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/doctor/all-patients')
      .then((response) => {
        setIsLoading(false);
        console.log(response.data[0].Patient);
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/report/discharge-summary', formData);
      console.log('Appointment submitted successfully:', response.data);
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <>
      <SideBar />
      <div className='RDisS'>
        <div className='RPageDisS'>
          <form className='FormDisS' onSubmit={handleSubmit}>
            <h2 className='FormTitleDisS'>Discharge Summary</h2>
            <div className='FormColumns'>
              <div className='FormColumn'>
                <select
                  className='FormInputDisS'
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

                <input
                  type='text'
                  className='FormInputDisS'
                  name='diagnosis'
                  placeholder='Diagnosis'
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='procedure_performed'
                  placeholder='Procedure Performed'
                  value={formData.procedure_performed}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='vital_signs'
                  placeholder='Vital Signs'
                  value={formData.vital_signs}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='imaging_results'
                  placeholder='Imaging Results'
                  value={formData.imaging_results}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='progress_note'
                  placeholder='Progress Note'
                  value={formData.progress_note}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  className='FormInputDisS'
                  name='medical_history'
                  placeholder='Medical History'
                  value={formData.medical_history}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  className='FormInputDisS'
                  name='consultation'
                  placeholder='Consultation'
                  value={formData.consultation}
                  onChange={handleInputChange}
                />

              </div>

              <div className='FormColumn'>
                <select
                  className={`FormInputDisS ${doctor_id ? 'selected-option' : 'placeholder'}`}
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

                <div className="date-time-container">
                  <div className='DateS'>
                  <Dateee
                    placeholder="Appointment Date"
                    onChange={handleAppointmentDateChange}
                  />
                  </div>
                </div>

             
                <input
                  type='text'
                  className='FormInputDisS'
                  name='medications'
                  placeholder='Medications'
                  value={formData.medications}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='laboratory_results'
                  placeholder='Laboratory Results'
                  value={formData.laboratory_results}
                  onChange={handleInputChange}
                />

              
                <input
                  type='text'
                  className='FormInputDisS'
                  name='discharge_plan'
                  placeholder='Discharge Plan'
                  value={formData.discharge_plan}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='summary'
                  placeholder='Summary'
                  value={formData.summary}
                  onChange={handleInputChange}
                />

                <input
                  type='text'
                  className='FormInputDisS'
                  name='recommendations'
                  placeholder='Recommendations'
                  value={formData.recommendations}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className='FormButton BDisS' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DisS;