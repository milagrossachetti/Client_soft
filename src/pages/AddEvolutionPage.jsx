import Navbar from '../components/Navbar.jsx';
import AddEvolution from '../components/AddEvolution.jsx';
import PatientInformation from '../components/PatientInformation.jsx';

import { useLocation } from 'react-router-dom';


const AddEvolutionPage = () => {
    const location = useLocation();
    const { patient, diagnosticoId } = location.state || {};
    return (
        <>
            <Navbar />
            <PatientInformation patient={patient} />
            <AddEvolution patient={patient} diagnosticoId={diagnosticoId} />
        </>
    )
}

export default AddEvolutionPage;