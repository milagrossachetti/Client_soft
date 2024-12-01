import '../styles/infoMedicalRecord.css';
import PropTypes from 'prop-types';

const InfoMedicalRecord = ({ patient }) => {
    if (!patient) {
        return <p>No se ha seleccionado ningún paciente</p>;
    }
    return (
        <div>
            <div className="patient-details">
                <h2>{patient.nombreCompleto}</h2>
                <div className="patient-info">
                    <p><span>Historia clínica:</span>{patient.historiaClinica.id}</p>
                    <p><span>CUIL:</span>{patient.cuil}</p>
                    <p><span>DNI:</span>{patient.dni}</p>
                    <p><span>Fecha de nacimiento:</span>{patient.fechaNacimiento}</p>
                    <p><span>Email:</span> {patient.email}</p>
                    <p><span>Direccion:</span>{patient.direccion}</p>
                    <p><span>Localidad:</span>{patient.localidad}</p>
                    <p><span>Provincia:</span> {patient.provincia}</p>
                    <p><span>Pais:</span>{patient.pais}</p>
                    <p><span>Nro afiliado:</span> {patient.nroAfiliado}</p>
                    <p><span>Obra social:</span>{patient.obraSocialId}</p>
                </div>
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