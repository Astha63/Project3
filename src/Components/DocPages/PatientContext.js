
import React, { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export function usePatientContext() {
    return useContext(PatientContext);
}

export function PatientProvider({ children }) {
    const [patientData, setPatientData] = useState({});

    const updatePatientData = (data) => {
        setPatientData(prevData => ({ ...prevData, ...data }));
    };

    return (
        <PatientContext.Provider value={{ patientData, updatePatientData }}>
            {children}
        </PatientContext.Provider>
    );
}
