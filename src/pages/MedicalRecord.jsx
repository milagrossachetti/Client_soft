import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import SearchComponent from '../components/Search.jsx';
import InfoMedicalRecord from '../components/InfoMedicalRecord.jsx';

const MedicalRecord = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    return (
        <>
            <Navbar />
            <SearchComponent onSelectPatient={setSelectedPatient} />
            <InfoMedicalRecord patient={selectedPatient} />
        </>
    )
}

export default MedicalRecord;