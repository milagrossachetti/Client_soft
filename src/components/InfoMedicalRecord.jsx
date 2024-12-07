import '../styles/infoMedicalRecord.css';
import PatientInformation from '../components/PatientInformation.jsx';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, User, CirclePlus } from 'lucide-react';


const InfoMedicalRecord = ({ patient, onPatientUpdate }) => {
    const navigate = useNavigate();
    if (!patient) {
        return <p>No se ha seleccionado ningún paciente</p>;
    }

    const diagnosticos = patient.historiaClinica.diagnosticos;

    return (
        <div>
            <PatientInformation patient={patient} />
            <div className="diagnostico-details">
                <h2>Diagnósticos</h2>
                {diagnosticos.map(diagnostico => (
                    <div key={`diagnostico-${diagnostico.id}`} className='diagnostico-info'>
                        <div className='name-data'>
                            <p className='name-diagnostico'>{diagnostico.nombreDiagnostico}</p>
                            {diagnostico.evoluciones.length > 0 && (() => {
                                const ultimaEvolucion = diagnostico.evoluciones[diagnostico.evoluciones.length - 1];
                                return (
                                    <div key={`ultima-evolucion-${diagnostico.id}`} className='ultima-evolucion'>
                                        <p>{ultimaEvolucion.texto}</p>
                                        <div className='data'>
                                            <div className='item-evolution'>
                                                <Calendar size={18} color="#4a4aa1" style={{ paddingTop: '8px' }} />
                                                <p>{new Date(ultimaEvolucion.fechaEvolucion).toLocaleDateString()}</p>
                                            </div>
                                            <div className='item-evolution'>
                                                <User size={18} color="#4a4aa1" style={{ paddingTop: '8px' }} />
                                                <p>{ultimaEvolucion.nombreMedico}</p>
                                            </div>
                                            <p className='especialidad'>{ultimaEvolucion.especialidadMedico}</p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        <div className='buttons'>
                            <button onClick={() => navigate('/evolutions', { state: { patient, diagnosticoId: diagnostico.id } })} className='button-evolutions button-see-evolutions'>Ver evoluciones <ChevronRight /></button>
                            <button onClick={() => navigate('/evolutions/add', { state: { patient, diagnosticoId: diagnostico.id, onPatientUpdate } })} className='button-evolutions button-add-evolution'><CirclePlus size={18} style={{ marginRight: '10px' }} />Crear evolución </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default InfoMedicalRecord;