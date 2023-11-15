
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Appoint.css';
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaFilter, FaTimes } from 'react-icons/fa';
import SideBar from './SideBar';
import { parse } from 'date-fns';
import axios from 'axios';

function Appoint() {
  const navigate = useNavigate();


  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [defaultPatients, setDefaultPatients] = useState([]);
  const [sortedPatients, setSortedPatients] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/doctor/all-appointments')
      .then((response) => {
        const appointmentsData = response.data.appointments;
        const patientsData = response.data.patients;

        const patientMap = new Map(patientsData.map((patient) => [patient.patient.patient_id, patient.patient.full_name]));

        const mappedAppointments = appointmentsData.map((appointmentData) => {
          const appointment = appointmentData.appointment;
          const patientName = patientMap.get(appointment.patient_id);
          const patient = patientsData.find((patientData) => patientData.patient.patient_id === appointment.patient_id);

          return {
            id: appointment.appointment_id,
            doctorId: appointment.doctor_id,
            timeSlot: appointment.time_slot,
            healthcareProvider: appointment.healthcare_provider,
            medicalHistory: appointment.medical_history,
            patientId: appointment.patient_id,
            date: appointment.date_of_appointment,
            department: appointment.department,
            symptoms: appointment.symptoms,
            appointmentStatus: appointment.appointment_status,
            patientName: patientName,
            gender: patient ? patient.patient.gender : '', // Access the gender field correctly
            emergencyContact: patient ? patient.patient.emergency_contact : '', // Access the emergency_contact field correctly

            maritalStatus: patient ? patient.patient.marital_status : '',
            phoneNumber: patient ? patient.patient.phone_number : '',
            primaryCareProvider: patient ? patient.patient.primary_care_provider : '',
            email: patient ? patient.patient.email : '',
            preferredLanguage: patient ? patient.patient.preferred_language : '',
            nationality: patient ? patient.patient.nationality : '',
            imagePath: patient ? patient.patient.image_path : '',
            fullName: patient ? patient.patient.full_name : '',
            occupation: patient ? patient.patient.occupation : '',
            createdAt: patient ? patient.patient.created_at : '',
            patientId: patient ? patient.patient.patient_id : '',
            abhaNumber: patient ? patient.patient.abha_number : '',
            updatedAt: patient ? patient.patient.updated_at : '',
            dateOfBirth: patient ? patient.patient.date_of_birth : '',
          };
        });


        setDefaultPatients(mappedAppointments);
        setSortedPatients(mappedAppointments); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        console.log("Selected Patient:", selectedPatient);
        console.log("Selected Patient's Patient Data:", selectedPatient.patient);

  
      });
  }, []);

  const openPopUp = (patient) => {
    setSelectedPatient(patient); // Update the selected patient state
    console.log("Opening popup for:", patient); // Log the patient information
  };

  const closePopUp = () => {
    setSelectedPatient(null);
  };

  const handleSort = () => {
    const sorted = [...sortedPatients].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.patientName.localeCompare(b.patientName);
      } else {
        return b.patientName.localeCompare(a.patientName);
      }
    });
    setSortedPatients(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleFilter = () => {
    const filteredAppointments = defaultPatients.filter((patient) => {
      const parsedDate = parse(patient.date, 'yyyy-MM-dd', new Date());

      const startDateParsed = startDate ? parse(startDate, 'yyyy-MM-dd', new Date()) : null;
      const endDateParsed = endDate ? parse(endDate, 'yyyy-MM-dd', new Date()) : null;

      const isDateMatch =
        (!startDateParsed || parsedDate >= startDateParsed) &&
        (!endDateParsed || parsedDate <= endDateParsed);

      const isTimeMatch = patient.timeSlot.includes(timeFilter); // Filter by timeSlot

      return isDateMatch && isTimeMatch;
    });

    setSortedPatients(filteredAppointments);
  };


  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    const filtered = defaultPatients.filter((patient) =>
      patient.id.toString().includes(input) ||
      patient.date.includes(input) ||
      patient.timeSlot.includes(input) ||
      patient.patientName.toLowerCase().includes(input.toLowerCase()) // Filter by patientName
    );

    setSortedPatients(filtered);
  };
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Use debounce for search input
  const debouncedSearch = debounce(handleSearchInputChange, 300); // Adjust the delay as needed

  // In your input element, use debouncedSearch:
  <input
    type="text"
    value={searchTerm}
    onChange={debouncedSearch}
    placeholder="Search Patients"
  />


  const clearSearch = () => {
    setSearchTerm('');
    setSortedPatients([...defaultPatients]);
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <>
      <SideBar />
      <div className="navbar-container">
        <div className="navbar">
          <div className="icon-container">
            <div className="sort-button" onClick={handleSort}>
              {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            </div>
            <div className="filter-icon" onClick={() => setShowFilterOptions(!showFilterOptions)}>
              <FaFilter />
            </div>
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>
          {showFilterOptions && (
            <div className="filter-options">
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Filter by Time"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              />
              <button onClick={handleFilter}>Apply Filter</button>
            </div>
          )}


          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Patients"
            />
            <button className="clear-search-button" onClick={clearSearch}>
              &#10006;
            </button>
            {suggestions.length > 0 && (
              <div className="dropdown">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setSuggestions([]);
                    }}
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>


  

  

      <div className="table-container">
        <div className="table-scroll-container">
          <table>
            <thead className="table-header">
              <tr>
                <th>Patient Name</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {sortedPatients.map((patient) => (

                <tr key={patient.id} onClick={() => openPopUp(patient)} className={selectedPatient === patient ? 'selected' : ''}>
                  <td>{patient.patientName}</td>
                  <td>{patient.date}</td>
                  <td>{patient.timeSlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
      {selectedPatient && (
        <div className="popup" style={selectedPatient ? { display: 'block' } : { display: 'none' }}>
          <div className="popup-content">
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> {selectedPatient.patientName}</p>
            <p><strong>Appointment Date:</strong> {selectedPatient.date}</p>
            <p><strong>Appointment Time:</strong> {selectedPatient.timeSlot}</p>

        
           
            <p><strong>Gender:</strong> {selectedPatient?.gender || 'Not specified'}</p>
            <p><strong>Emergency Contact:</strong> {selectedPatient?.emergencyContact || 'Not specified'}</p>
            <p><strong>Marital Status:</strong> {selectedPatient?.maritalStatus || 'Not specified'}</p>
            <p><strong>Medical History:</strong> {selectedPatient?.medicalHistory || 'Not specified'}</p>
            <p><strong>Phone Number:</strong> {selectedPatient?.phoneNumber || 'Not specified'}</p>
            <p><strong>Primary Care Provider:</strong> {selectedPatient?.primaryCareProvider || 'Not specified'}</p>
            <p><strong>Email:</strong> {selectedPatient?.email || 'Not specified'}</p>
            <p><strong>Preferred Language:</strong> {selectedPatient?.preferredLanguage || 'Not specified'}</p>
            <p><strong>Nationality:</strong> {selectedPatient?.nationality || 'Not specified'}</p>
            <p><strong>Occupation:</strong> {selectedPatient?.occupation || 'Not specified'}</p>
            <p><strong>Created At:</strong> {selectedPatient?.createdAt || 'Not specified'}</p>
            <p><strong>Patient ID:</strong> {selectedPatient?.patientId || 'Not specified'}</p>
            <p><strong>Abha Number:</strong> {selectedPatient?.abhaNumber || 'Not specified'}</p>
            <p><strong>Updated At:</strong> {selectedPatient?.updatedAt || 'Not specified'}</p>
            <p><strong>Date of Birth:</strong> {selectedPatient?.dateOfBirth || 'Not specified'}</p>

          
            
            <div className="button-container">
              <button onClick={() => navigate('/RescheduleAppoint')}>Reschedule Appointment</button>
              <button onClick={() => navigate('/CancelAppoint')}>Cancel Appointment</button>
              <button onClick={closePopUp}>Close</button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}

export default Appoint;

