import Navbar from '../components/Navbar.jsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Popup from "reactjs-popup";
import PatientInformation from '../components/PatientInformation.jsx';
import '../styles/evolutions.css';
import { NotepadTextDashed, FileText, CirclePlus } from 'lucide-react';



const Evolutions = () => {
    const location = useLocation();
    const { patient, diagnosticoId } = location.state || {};

    const diagnostico = patient.historiaClinica.diagnosticos.find(
        d => d.id === diagnosticoId
    );

    const nombreDiagnostico = diagnostico.nombreDiagnostico;
    const [selectedRecetas, setSelectedRecetas] = useState(null);

    const handleOpenPopup = (recetas) => {
        setSelectedRecetas(recetas);
    };


    return (
        <>
            <Navbar />
            <PatientInformation patient={patient} />
            <div className='evolutions'>
                <div className='title-evolutions'>
                    <h2>Evoluciones de <span style={{ color: '#4a4aa1' }}>{nombreDiagnostico}</span> </h2>
                    <button className='button-evolutions button-add-evolution'><CirclePlus size={18} style={{ marginRight: '10px' }} />Crear evolución </button>
                </div>
                {diagnostico.evoluciones.slice().reverse().map((evolucion, index) => (
                    <div key={`${evolucion.id}-${index}`} style={{ display: 'flex' }}>
                        <div className="timeline-container">
                            <div className="line"></div>
                            <div className="point"></div>
                        </div>
                        <div className='evolutions-info'>
                            <div className='header-card-evolution'>
                                <div className='content-card-evolution'>
                                    <p className='date-evolution'>
                                        {`${new Date(evolucion.fechaEvolucion).toLocaleDateString()}, ${new Date(evolucion.fechaEvolucion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                    </p>
                                    <p className='especialidad'>{evolucion.especialidadMedico}</p>
                                </div>
                                <p>{evolucion.nombreMedico}</p>
                            </div>
                            <div className='info-evolution'>
                                <p>{evolucion.texto}</p>
                                <div className='evolution-templates'>
                                    {evolucion.plantillaControl && (
                                        <p className='template-item'><NotepadTextDashed size={18} color="#4a4aa1" style={{ marginRight: '8px' }} />Plantilla de control</p>
                                    )}
                                    {evolucion.plantillaLaboratorio && (
                                        <p className='template-item'><NotepadTextDashed size={18} color="#4a4aa1" style={{ marginRight: '8px' }} /> Plantilla de laboratorio</p>
                                    )}
                                    {evolucion.recetas.length > 0 && (
                                        <p className='template-item'
                                            onClick={() => { handleOpenPopup(evolucion.recetas); }}>
                                            <FileText size={18} color="#4a4aa1" style={{ marginRight: '8px' }} />
                                            Recetas
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Popup open={!!selectedRecetas} onClose={() => setSelectedRecetas(null)} modal>
                <div className='container-recetas'>
                    <h2>Receta</h2>
                    {selectedRecetas && (
                        <ul className='list-receta'>
                            {selectedRecetas.map((receta, index) => (
                                <div key={index}>
                                    <div className='container-data-doctor'>
                                        <div>
                                            <li className='li-receta'>{receta.nombreMedico}</li>
                                            <li className='li-receta'>{receta.especialidadMedico}</li>
                                        </div>
                                        <div>
                                            <li className='li-receta'>{new Date(receta.fecha).toLocaleDateString()}</li>
                                        </div>
                                    </div>
                                    <div>
                                        <li className='li-receta medicamentos'>Medicamentos:</li>
                                        {receta.medicamentos.map(medicamento => (
                                            <li key='medicamento' className='li-receta'>{medicamento.nombre}</li>
                                        ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </Popup>

        </>
    )
}

export default Evolutions;