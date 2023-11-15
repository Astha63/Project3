import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import './RegisterP1.css';
import './OperationalIN.css';
import Datee from './Datee';
import axios from 'axios';




function OperationalN() {
  const [selectedPatient_id, setSelectedPatient_id] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/doctor/all-patients')
      .then((response) => {
        setIsLoading(false);
        console.log(response.data)
        setPatientList(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
        setIsLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    patient_id: '',
    operation_date: '',
    procedure_performed: '',
    indication: '',
    preoperative_diagnosis: '',
    instruments_and_equipments: '',
    duration: '',
    surgeon_name: '',
    assistant_surgeon: '',
    surgical_technique: '',
    operating_room_staff: '',
    interoperative_findings: '',
    postoperative_diagnosis: '',
    postoperative_management: '',
    anesthesiologist:''
  });

  const handleDateChange = (selectedDate) => {
    const dateObject = new Date(selectedDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setFormData({
      ...formData,
      operation_date: formattedDate,
      patient_id: parseInt(selectedPatient_id), 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/doctor/operation-note', formData);
      console.log('Operation note submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting operation note:', error);
    }
  };


  return (
    <>
      <SideBar />
      <form  onSubmit={handleSubmit}>

      <div className="FormON">
        <h2 className="FormTitleON">Operational Notes</h2>
        <div className="FormContainerON">
          <div className="FormT">
              <select
                className={`FormInputON1 ${selectedPatient_id ? 'selected-option' : 'placeholder'}`}
                value={selectedPatient_id}
                onChange={(event) => setSelectedPatient_id(event.target.value)}
                style={{ color: selectedPatient_id ? 'black' : '#999' }}
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
                      {patient.patients.full_name}
                    </option>
                  ))
                )}
              </select>
              <div className="date-time-container2">
                <div className='DateR'>
                  <Datee placeholder=" Enter Operation Date" onChange={handleDateChange} />
                </div>
              <input
                type="text"
                name="duration"
                placeholder="Enter Duration"
                className="FormInputON"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
          </div>
            <input
              type="text"
              name="procedure_performed"
              placeholder="Enter Procedure Performed"
              className="FormInputON1"
              value={formData.procedure_performed}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="indication"
              placeholder="Enter Indication"
              className="FormInputON1"
              value={formData.indication}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="preoperative_diagnosis"
              placeholder="Enter Preoperative Diagnosis"
              className="FormInputON1"
              value={formData.preoperative_diagnosis}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="instruments_and_equipments"
              placeholder="Enter Instruments and Equipments"
              className="FormInputON1"
              value={formData.instruments_and_equipments}
              onChange={handleInputChange}
              required
            />
              <input
                type="text"
                name="anesthesiologist"
                placeholder="Enter anesthesiologist"
                className="FormInputON1"
                value={formData.anesthesiologist}
                onChange={handleInputChange}
                required
              />
           
          </div>

          <div className="formS">
            <input
              type="text"
              name="surgeon_name"
              placeholder="Enter Surgeon Name"
              className="FormInputON1"
              value={formData.surgeon_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="assistant_surgeon"
              placeholder="Enter Assistant Surgeon"
              className="FormInputON1"
              value={formData.assistant_surgeon}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="surgical_technique"
              placeholder="Enter Surgical Technique"
              className="FormInputON1"
              value={formData.surgical_technique}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="operating_room_staff"
              placeholder="Enter Operating Room Staff"
              className="FormInputON1"
              value={formData.operating_room_staff}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="interoperative_findings"
              placeholder="Enter Interoperative Findings"
              className="FormInputON1"
              value={formData.interoperative_findings}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="postoperative_diagnosis"
              placeholder="Enter Postoperative Diagnosis"
              className="FormInputON1"
              value={formData.postoperative_diagnosis}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="postoperative_management"
              placeholder="Enter Postoperative Management"
              className="FormInputON1"
              value={formData.postoperative_management}
              onChange={handleInputChange}
              required
            />
          </div> 
        </div>
          <button className='FormButton B8' type='submit'>
            Submit
          </button>
       
      </div>
      </form>
    </>
  );
}

export default OperationalN;
