import Navbar from '../components/Navbar.jsx';
import { useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { MedicalContext } from '../components/MedicalContext';
import { useNavigate } from 'react-router-dom';
import Popup from "reactjs-popup";
import PatientInformation from '../components/PatientInformation.jsx';
import '../styles/evolutions.css';
import { NotepadTextDashed, FileText, CirclePlus, Stethoscope } from 'lucide-react';

const Evolutions = () => {
    const { patient } = useContext(MedicalContext)
    const navigate = useNavigate();
    const location = useLocation();
    const { diagnosticoId } = location.state || {};

    const diagnostico = patient[0].historiaClinica.diagnosticos.find(
        d => d.id === diagnosticoId
    );
    const beneficiario = patient[0].nombreCompleto;
    const cobertura = patient[0].obraSocial.codigo;
    const nroAfiliado = patient[0].nroAfiliado;
    const nombreDiagnostico = diagnostico.nombreDiagnostico;
    const [selectedRecetas, setSelectedRecetas] = useState(null);
    const [selectedPlantillaControl, setSelectedPlantillaControl] = useState(null);
    const [selectedPlantillaLaboratorio, setSelectedPlantillaLaboratorio] = useState(null);
    const [popupSelected, setPopupSelected] = useState(null)

    const handleOpenPopupRecetas = (recetas) => {
        setSelectedRecetas(recetas);
        setPopupSelected(true);
    };
    const handleOpenPopupPlantillaControl = (plantillaControl) => {
        setSelectedPlantillaControl(plantillaControl);
        setPopupSelected(true);
    };
    const handleOpenPopupPlantillaLaboratorio = (plantillaLaboratorio) => {
        setSelectedPlantillaLaboratorio(plantillaLaboratorio);
        setPopupSelected(true);
    };

    return (
        <div>
            <div className={`body-evolutions ${popupSelected ? 'blur' : ''}`}>
                <Navbar />
                <PatientInformation />
                <div className='evolutions'>
                    <div className='title-evolutions'>
                        <h2>Evoluciones de <span style={{ color: '#4a4aa1' }}>{nombreDiagnostico}</span> </h2>
                        <button onClick={() => navigate('/evolutions/add', { state: { diagnosticoId: diagnostico.id } })} className='button-evolutions button-add-evolution'><CirclePlus size={18} style={{ marginRight: '10px' }} />Crear evolución </button>
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
                                            <p className='template-item' onClick={() => { handleOpenPopupPlantillaControl(evolucion.plantillaControl); }}><NotepadTextDashed size={18} color="#4a4aa1" style={{ marginRight: '8px' }} />Plantilla de control</p>
                                        )}
                                        {evolucion.plantillaLaboratorio && (
                                            <p className='template-item' onClick={() => { handleOpenPopupPlantillaLaboratorio(evolucion.plantillaLaboratorio); }}><NotepadTextDashed size={18} color="#4a4aa1" style={{ marginRight: '8px' }} /> Plantilla de laboratorio</p>
                                        )}
                                        {evolucion.recetas.length > 0 && (
                                            <p className='template-item'
                                                onClick={() => { handleOpenPopupRecetas(evolucion.recetas); }}>
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
            </div>
            <Popup open={!!selectedRecetas} onClose={() => { setSelectedRecetas(null); setPopupSelected(false); }} modal>
                <div className='container-recetas'>
                    {selectedRecetas && (
                        <ul className='list-receta'>
                            {selectedRecetas.map((receta, index) => (
                                <div key={index}>
                                    <div className='data-policlinica'>
                                        <p className='name-policlinica' ><Stethoscope style={{ transform: 'rotate(-45deg)', marginRight: '5px' }} />Policlinica MARB</p>
                                        <p className='item-receta'>BERNARDINO RIVADAVIA 1050, San Miguel de Tucumán</p>
                                        <p className='item-receta'>Tel: 381</p>
                                    </div>
                                    <div className='data-prescription'>
                                        <li className='li-receta'>Fecha Receta: {new Date(receta.fecha).toLocaleDateString()}</li>
                                        <li className='li-receta'>Receta N°: {receta.id}</li>
                                    </div>
                                    <div className='data-patient'>
                                        <li className='li-receta'><strong>Beneficiario:</strong> {beneficiario}</li>
                                        <li className='li-receta'><strong>Cobertura:</strong> {cobertura}</li>
                                        <li className='li-receta'><strong>N° Afialiado:</strong> {nroAfiliado}</li>
                                    </div>
                                    <div className='medicamentos-container'>
                                        <li className='li-receta medicamentos'>Rp/</li>
                                        {receta.medicamentos.map(medicamento => (
                                            <li key='medicamento' className='li-receta'>{medicamento.nombre}</li>
                                        ))
                                        }
                                    </div>
                                    <div className='container-data-doctor'>
                                        <div>
                                            <li className='li-receta'>{receta.nombreMedico}</li>
                                            <li className='li-receta'>Especialidad: {receta.especialidadMedico}</li>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </Popup>
            <Popup open={!!selectedPlantillaControl} onClose={() => { setSelectedPlantillaControl(null); setPopupSelected(false); }} modal>
                <div className='container-recetas'>
                    {selectedPlantillaControl && (
                        <ul className='list-receta'>
                            <div>
                                <div className='data-policlinica'>
                                    <p className='name-policlinica' ><Stethoscope style={{ transform: 'rotate(-45deg)', marginRight: '5px' }} />Policlinica MARB</p>
                                    <p className='item-receta'>BERNARDINO RIVADAVIA 1050, San Miguel de Tucumán</p>
                                    <p className='item-receta'>Tel: 381</p>
                                </div>
                                <div className='data-prescription'>
                                    <li className='li-receta'>Fecha Plantilla de Control: {new Date().toLocaleDateString()}</li>
                                </div>
                                <div className='data-patient'>
                                    <li className='li-receta'><strong>Peso (kg): </strong>{selectedPlantillaControl.peso}</li>
                                    <li className='li-receta'><strong>Altura (cm): </strong>{selectedPlantillaControl.altura}</li>
                                    <li className='li-receta'><strong>Presion arterial: </strong>{selectedPlantillaControl.presion}</li>
                                    <li className='li-receta'><strong>Pulso: </strong>{selectedPlantillaControl.pulso}</li>
                                    <li className='li-receta'><strong>Saturación de oxigeno: </strong>{selectedPlantillaControl.saturacion}</li>
                                    <li className='li-receta'><strong>Nivel de Azúcar (mg/dL): </strong>{selectedPlantillaControl.nivelAzucar}</li>
                                </div>
                            </div>
                        </ul>
                    )}
                </div>
            </Popup>
            <Popup
                open={!!selectedPlantillaLaboratorio}
                onClose={() => {
                    setSelectedPlantillaLaboratorio(null);
                    setPopupSelected(false);
                }}
                modal
            >
                <div className="container-recetas">
                    {selectedPlantillaLaboratorio && (
                        <ul className="list-receta">
                            <div>
                                <div className="data-policlinica">
                                    <p className="name-policlinica">
                                        <Stethoscope
                                            style={{ transform: "rotate(-45deg)", marginRight: "5px" }}
                                        />
                                        Policlinica MARB
                                    </p>
                                    <p className="item-receta">BERNARDINO RIVADAVIA 1050, San Miguel de Tucumán</p>
                                    <p className="item-receta">Tel: 381</p>
                                </div>
                                <div className="data-prescription">
                                    <li className="li-receta">Fecha: {new Date().toLocaleDateString()}</li>
                                    <li className="li-receta">Pedido de Laboratorio</li>
                                </div>
                                <div className="data-patient">
                                    <li className="li-receta">
                                        <strong>Beneficiario:</strong> {beneficiario}
                                    </li>
                                    <li className="li-receta">
                                        <strong>Cobertura:</strong> {cobertura}
                                    </li>
                                    <li className="li-receta">
                                        <strong>N° Afiliado:</strong> {nroAfiliado}
                                    </li>
                                </div>
                                <div className="medicamentos-container">
                                    <li className="li-receta medicamentos">Estudios solicitados:</li>
                                    {Array.isArray(selectedPlantillaLaboratorio.tiposEstudios) &&
                                        selectedPlantillaLaboratorio.tiposEstudios.map((estudio, index) => (
                                            <li key={index} className="li-receta">{estudio}</li>
                                        ))
                                    }
                                </div>
                                <div className="medicamentos-container">
                                    <li className="li-receta medicamentos">Items:</li>
                                    {Array.isArray(selectedPlantillaLaboratorio.items) &&
                                        selectedPlantillaLaboratorio.items.map((item, index) => (
                                            <li key={index} className="li-receta">
                                                {item}
                                            </li>
                                        ))}
                                </div>
                            </div>
                        </ul>
                    )}
                </div>
            </Popup>


        </div>
    )
}

export default Evolutions;