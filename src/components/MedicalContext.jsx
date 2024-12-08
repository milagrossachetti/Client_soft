import { createContext, useState } from 'react';

export const MedicalContext = createContext();

export const MedicalProvider = ({ children }) => {
    const [patient, setPatient] = useState(null);

    const updatePatient = async (cuil) => {
        try {
            const response = await fetch(`http://localhost:8080/paciente?cuil=${cuil}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const newPatient = await response.json();
                setPatient(newPatient);
            } else {
                console.error('Error al actualizar el paciente');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <MedicalContext.Provider value={{ patient, updatePatient }}>
            {children}
        </MedicalContext.Provider>
    );
};
