const PatientInformation = ({ patient }) => {
    return (
        <div className="patient-details">
            <h2>{patient.nombreCompleto}</h2>
            <div className="patient-info">
                <p><span>CUIL:</span>{patient.cuil}</p>
                <p><span>Fecha de nacimiento:</span>{patient.fechaNacimiento}</p>
                <p><span>Obra social:</span>{patient.obraSocial.sigla}</p>
            </div>
        </div>
    )
}

export default PatientInformation;