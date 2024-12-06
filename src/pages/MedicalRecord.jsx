import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import SearchComponent from '../components/Search.jsx';
import InfoMedicalRecord from '../components/InfoMedicalRecord.jsx';

const MedicalRecord = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const handlePatientUpdate = (updatedPatient) => {
        setSelectedPatient(updatedPatient);
    };
    return (
        <>
            <Navbar />
            <SearchComponent onSelectPatient={setSelectedPatient} />
            {selectedPatient && (
                <InfoMedicalRecord
                    patient={selectedPatient}
                    onPatientUpdate={handlePatientUpdate} // Pasamos la función
                />
            )}
        </>
    )
}

export default MedicalRecord;