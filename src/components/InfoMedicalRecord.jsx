import '../styles/infoMedicalRecord.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ChevronRight } from 'lucide-react';


const InfoMedicalRecord = ({ patient }) => {
    const navigate = useNavigate();
    if (!patient) {
        return <p>No se ha seleccionado ningún paciente</p>;
    }

    const diagnosticos = patient.historiaClinica.diagnosticos;

    return (
        <div>
            <div className="patient-details">
                <h2>{patient.nombreCompleto}</h2>
                <div className="patient-info">
                    <p><span>CUIL:</span>{patient.cuil}</p>
                    <p><span>Fecha de nacimiento:</span>{patient.fechaNacimiento}</p>
                    <p><span>Obra social:</span>{patient.obraSocialId}</p>
                </div>
            </div>
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
                                                <Calendar size={18} color="blue" style={{ paddingTop: '8px' }} />
                                                <p>{new Date(ultimaEvolucion.fechaEvolucion).toLocaleDateString()}</p>
                                            </div>
                                            <div className='item-evolution'>
                                                <User size={20} color="blue" style={{ paddingTop: '8px' }} />
                                                <p>{ultimaEvolucion.nombreMedico}</p>
                                            </div>
                                            <p className='especialidad'>{ultimaEvolucion.especialidadMedico}</p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        <button onClick={() => navigate('/evolutions')} className='button-evolutions'>Ver evoluciones <ChevronRight /></button>
                    </div>
                ))}


            </div>
        </div>
    );
}


InfoMedicalRecord.propTypes = {
    patient: PropTypes.shape({
        nombreCompleto: PropTypes.string.isRequired,
        historiaClinica: PropTypes.shape({
            id: PropTypes.string.isRequired,
            diagnosticos: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    nombreDiagnostico: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired,
        cuil: PropTypes.string.isRequired,
        dni: PropTypes.string.isRequired,
        fechaNacimiento: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        direccion: PropTypes.string.isRequired,
        localidad: PropTypes.string.isRequired,
        provincia: PropTypes.string.isRequired,
        pais: PropTypes.string.isRequired,
        nroAfiliado: PropTypes.string.isRequired,
        obraSocialId: PropTypes.string.isRequired
    })
};
export default InfoMedicalRecord;