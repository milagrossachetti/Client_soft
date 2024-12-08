import { useContext } from 'react';
import { MedicalContext } from '../components/MedicalContext';

const PatientInformation = () => {
    const { patient } = useContext(MedicalContext)

    return (
        <div className="patient-details">
            <h2>{patient[0].nombreCompleto}</h2>
            <div className="patient-info">
                <p><span>CUIL:</span>{patient[0].cuil}</p>
                <p><span>Fecha de nacimiento:</span>{patient[0].fechaNacimiento}</p>
                <p><span>Obra social:</span>{patient[0].obraSocial.sigla}</p>
            </div>
        </div>
    )
}

export default PatientInformation;