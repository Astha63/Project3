import { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export function useAppointmentContext() {
    return useContext(AppointmentContext);
}

export function AppointmentProvider({ children }) {
 
    const [patientId, setPatientId] = useState(''); // Set an initial value if needed
    const [appointmentId, setAppointmentId] = useState(''); // Set an initial value if needed


const addAppointment = (data) => {
    console.log('Adding Appointment Data:', data);
    setAppointmentId(data.appointment_id);
    setPatientId(data.patient_id);
};


    const contextValue = {
        patientId,
        setPatientId,
        appointmentId,
        addAppointment,
        setAppointmentId,
    };

    return (
        <AppointmentContext.Provider value={contextValue}>
            {children}
        </AppointmentContext.Provider>
    );
}
